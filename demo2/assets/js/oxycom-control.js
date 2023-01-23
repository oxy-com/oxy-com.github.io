Web.on('loaded', async (event) => {
  // const {Client} = Aim;
  // const serviceRoot = document.location.origin + '/demo2';
  // const appClient = Client.create({serviceRoot});
  function modbusElem(modbus){
    console.debug({modbus});
    modbus.sort((a,b) => a.identifier.localeCompare(b.identifier));
    return $('details').append(
      $('summary').text('Modbus'),
      modbus.map(obj => $('details').append(
        $('summary').text(obj.identifier),
        $('table').append(
          $('tbody').append(
            Array.from(Object.entries(obj)).filter(([key,value]) => value !== null).map(([key,value]) => $('tr').append(
              $('td').text(key),
              $('td').text(String(value)),
            ))
          ),
        ),
      )),
    );
  }
  function objElem(obj){
    if (!obj) return null;
    if (Array.isArray(obj)) return obj.map(obj => $('li').append(objElem(obj)));
    if (obj instanceof Object) return $('table').append(
      Array.from(Object.entries(obj)).map(([name,obj]) => $('tr').append(
        $('td').text(name),
        $('td').text(obj),
      ))
    )
    return obj;
  }

  function objTreeElem(name, obj, open) {
    if (Array.isArray(obj)) {
      const elem = $('details').class('arr').open(open);
      if (name) $('summary').text(name).parent(elem);
      obj.forEach((obj,i,rows) => {
        if (obj instanceof Object && Array.isArray(Object.values(obj)[0])) {
          objTreeElem(Object.keys(obj)[0]+':', Object.values(obj)[0], open).parent(elem);
        } else {
          objTreeElem('', obj, open).parent(elem);
        }
      });
      return elem;
    } else if (obj instanceof Object) {
      const elem = $('details').class('obj').open(open);
      if (name) $('summary').text(name).parent(elem);
      Object.entries(obj).forEach(([name,obj],i,rows) => {
        if (Array.isArray(obj)) {
          objTreeElem(name+':', obj, open).parent(elem);
        } else if (obj instanceof Object) {
          objTreeElem(name+':', obj, open).parent(elem);
        } else {
          $('summary').text(name+':', obj).parent(elem);
        }
      });
      return elem;
    } else {
      return $('li').text(obj);
    }
  }
  function productenElem(producten){
    console.debug({producten});
    // modbus.sort((a,b) => a.identifier.localeCompare(b.identifier));
    return $('details').append(
      $('summary').text('Producten'),
      producten.map(obj => $('details').append(
        $('summary').append(
          $('span').text(obj.name),
          $('img').src(obj.icon3d),
        ),
        $('img').src(obj.icon3d),
        $('p').text(obj.description),
        !obj.info ? null : Array.from(Object.entries(obj.info)).map(([name,props]) => $('details').append(
          $('summary').text(name),
          objElem(props),
        )).flat(),
      )),
    );
  }
  const {types,parts,modbus,producten,bs} = await Aim.fetch('https://aliconnect.nl/oxycom/oxycom.github.io/demo2/config-product').get();
  $(document.body).clear().append(
    productenElem(producten),
    modbusElem(modbus),
    objTreeElem('Breakdown', bs, false).class('tree obj'),
    //
    // $('details').class('tree').open(true).append(
    //   $('summary').text('Breakdown'),
    //   objTreeElem(bs, true),
    // ),
  )
  // $(document.body).append(
  //   $('h1').text('Types'),
  //   types.map(type => [
  //     $('h2').text(type.name),
  //   ]),
  //   $('h1').text('Parts'),
  //   parts.map(part => [
  //     $('h2').text(part.name),
  //   ]),
  //   $('h1').text('Systems'),
  //   systems.map(system => [
  //     $('h2').text(system.name),
  //   ]),
  // )
});
