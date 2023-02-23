const serviceRoot = 'https://aliconnect.nl/v1';
const socketRoot = 'wss://aliconnect.nl:444';
Web.on('loaded', (event) => Abis.config({serviceRoot,socketRoot}).init().then(async (abis) => {
  const {config,Client,Prompt,Pdf,Treeview,Listview,Statusbar,XLSBook,authClient,abisClient,socketClient,tags,treeview,listview,account,Aliconnect,getAccessToken} = abis;
  const {num} = Format;
  const url = new URL(document.location);
  const {client_id,forms,costs,info} = config;
  Aim.fetch('https://aliconnect.nl/oxycom/oxycontrol/public/config/product').get().then(product => {
    config(product);
    const defaultUnit = {
      type: 'oxycontrol',
      address: 1,
      host: 'localhost',
      port: 502,
      http: {port: 8080},

      mc: 2,
      f: 1,
      oc: true,
      ao: 1,
      fpc: true,
      fps: true,
      ic: 1,
      sd: true,
      xe: true,
      hr: 1,
      hpf: true,
      heat: true,
    };
    var items = JSON.parse(window.sessionStorage.getItem('items')) || [defaultUnit];
    console.log(items);
    config({items});
    const {definitions,producten,configurator} = config;
    // window.sessionStorage.clear();
    // var items = [defaultUnit];
    const {modules,wirediagram} = configurator;
    function save(){
      const {el} = $('details>form');
      const itemId = el.systemId.value;
      if (itemId) {
        window.sessionStorage.setItem('systemId', itemId);
        // console.log('1');
        abisClient.api('/json').body({
          filename: '/oxycom/config/'+itemId,
          content: {itemId,items},
        }).post().then(res => console.debug(res));
      }
    }
    function buildconfig() {
      const {el} = $('details>form');
      const aantal = Number(el.aantal.value||1);
      for (var i=0;i<aantal;i++) {
        items[i]=items[i] || Object.assign({},items[0],{mc:0,fps:false,oc:false,http:null});
      }
      items.length = aantal;
      function unitElem(unit,i){
        const imageElem = $('div').style('display:flex;');
        function buildimage(event) {
          // console.log(event.target,this)
          Object.assign(unit,Object.fromEntries(new FormData(elem.el).entries()));
          // window.sessionStorage.setItem('configdata', JSON.stringify(data = Object.fromEntries(new FormData(el).entries())));
          window.sessionStorage.setItem('items', JSON.stringify(items));
          // console.log(unit,items);
          const images = [];
          const NV=1;
          const FK=2;
          const SF=3;
          const HR=1;
          const HRH=2;
          function getElement(name) {
            return elem.el.elements[name];
          }
          function getElements(name) {
            return Array.from(elem.el.elements[name]);
          }
          // console.log(getElement('hr'));

          getElement('hr')[1].disabled = [SF].includes(Number(getElement('ic').value));
          getElement('xe').disabled = ![FK].includes(Number(getElement('ic').value));
          getElement('sd').disabled = !Number(getElement('ic').value);

          if (Number(getElement('ao').value)) images.push('cto-ao-'+getElement('ao').value);

          if (getElement('ic').value == SF) {
            images.push('cto-sf');

            getElement('hr').value = Number(getElement('hr').value) ? 2 : 0;

            if (getElement('sd').checked) images.push('cto-sf-sd');
            if (getElement('hr').value==HR) {
              images.push(getElement('heat').checked ? 'cto-sf-hr-heat' : 'cto-sf-hr');
              images.push(getElement('hpf').checked ? 'cto-sf-fm-1' : 'cto-sf-fm-0');
            }
            if (getElement('hr').value==HRH) {
              images.push(getElement('heat').checked ? 'cto-sf-hr-heat' : 'cto-sf-hr');
              images.push(getElement('hpf').checked ? 'cto-sf-fm-1' : 'cto-sf-fm-0');
            }
          } else {
            if (getElement('ic').value) {
              getElement('hpf').disabled = true;


              if (getElement('hr').value==HR) {
                getElement('hpf').disabled = false;
                images.push(getElement('hpf').checked ? 'cto-fm-1' : 'cto-fm-0');
                images.push(getElement('heat').checked ? 'cto-hr-heat' : 'cto-hr');
              }
              if (getElement('hr').value==HRH) {
                getElement('hpf').checked = true;
                images.push(getElement('heat').checked ? 'cto-hrh-heat' : 'cto-hrh');
              }

              if (getElement('ic').value==NV) {
                var src = 'cto-nv';
                if (getElement('sd').checked) src += '-sd';
                images.push(src);
              }
              if (getElement('ic').value==FK) {
                var src = 'cto-fk';
                if (getElement('xe').checked) src += '-xe';
                if (getElement('sd').checked) src += '-sd';
                images.push(src);
              }
            }
          }
          images.push('cto-f-'+getElement('f').value);
          if (Number(getElement('mc').value)) images.push('cto-mc-'+getElement('mc').value);
          if (Number(getElement('wt').value)) images.push('cto-wt-'+getElement('wt').value);
          if (getElement('fpc').checked) images.push('cto-fp-c');
          if (getElement('fps').checked) images.push('cto-fp-s');
          if (getElement('oc').checked) images.push('cto-o-oc');
          if (getElement('hoes').checked) images.push('cto-o-hoes');
          if (getElement('demp').checked) images.push('cto-o-demp');

          imageElem.clear().style('border:solid 1px gray;height:500px;').append(
            // $('img').src(`/assets/image/product/cto.png`).style('width:100%;'),
            images.map(src => $('img').src(`/assets/image/product/${src}.png`).style('position:absolute;left:0;height:100%;')),
          );
        }
        function checkbox(name, title) {
          return $('span').append(
            $('input').type('checkbox').id(name+i).name(name).checked(unit[name]),
            $('label').text(title||name).for(name+i),
          )
        }
        function radio(name, title, options, value) {
          return $('div').append(
            $('label').text(title+': '),
            options.map((f,x) => [
              $('input').type('radio').id(name+x+i).value(x).name(name).checked(x==(unit[name]||0)),
              $('label').text(f).for(name+x+i),
            ]),
          )
        }
        const elem = $('form').on('change', buildimage).append(
          $('div').append(
            radio('mc', 'Master control', ['None','Thermostat','Programmable','Analog input','Modbus'], 2).append(
              checkbox('oc', 'OxyConnect'),
            ),
            // radio('filter', 'Filter', ['None','G3','G4','M5','F7']),
            radio('f', 'Filter', ['G4','F7']),
            // radio('wd', 'Water desinfection', ['None','Ozone','UV/C','Chlorine Dioxine']),
            radio('wt', 'Water treatment', ['None','UV/C']),
            $('div').append(
              $('label').text('Freeze Protection: '),
              checkbox('fpc', 'Coil'),
              checkbox('fps', 'Water Supply'),
            ),
            radio('ic', 'IntrCooll', ['Basic','NV-Module','Flashing-Kit','Support-Frame']).append(
              checkbox('sd', 'Shutoff damper'),
              checkbox('xe', 'XE'),
            ),
            radio('hr', 'Option HR', ['None','Vertical','Horizontal']).append(
              checkbox('heat', 'Heating'),
              checkbox('hpf', 'High Pressure Fan'),
            ),
            radio('ao', 'Nozzle', ['None','Air Optimizer','Nozzle Diffuser 1','Nozzle Diffuser 2','Nozzle Diffuser 3']),
            $('div').append(
              checkbox('hoes', 'Hoes'),
              checkbox('demp', 'Geluid Demper'),
            ),
          ),
          imageElem,
        )
        setTimeout(buildimage,0);
        return elem;
      }
      $('.items').clear().append(
        $('ol').append(
          items.map(unitElem),
        ),
        // $('div').class('configimage').style('display:flex;flex-wrap:wrap;'),
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
    function quotation(){
      const diagrams = [].concat(...items.map(unit => modules[unit.module||0]).map(mod => mod.wirediagram)).unique();
      console.log(diagrams);

      $('div').append(
        $('h1').text('Quotation'),
        $('h1').text('Units'),
        items.map((unit,i) => [
          $('h2').text('Unit', i+1),
          unitimage(unit),
        ]),
        $('h1').text('Wiring Diagram'),
        diagrams.map(nr => wirediagram[nr]).map(diagram => $('img').src(diagram.src)),
      ).print();
    }

    async function sim(){
      const {el} = $('details>form');
      const itemId = el.systemId.value;
      config({itemId});
      $('link').parent(document.head).rel('stylesheet').href('https://aliconnect.nl/oxycom/oxycontrol/public/assets/css/gui.css');
      Oxycontrol.init({items}).then(items => {
        Aim.systemBuild();
        items.forEach(item => item.init());
        items.forEach(item => item.sim());
        return Oxycontrol.gui();
      });
    }

    function propertyDescription(property){
      const {options,menuSettings,menuRead,settingsApp,oxyconnect,config} = property;
      const {isAhu,isStand,isAqua} = config||{};
      const descriptionStyle = '';//'font-style:italic;';
      const elem = $('div').append(
        // $('div').text(property.name.displayName()).style('font-weight:bold;'),
        $('div').text([
          property.description || property.name.displayName(),
          (menuSettings||{}).description,
          (menuRead||{}).description,
          (settingsApp||{}).description,
        ].filter(Boolean).join(' / ')),
        // menuSettings && menuSettings.description? $('div').text('menuSettings:',menuSettings.description) : null,
        // menuRead && menuRead.description? $('div').text('menuRead:',menuRead.description) : null,
        // settingsApp && settingsApp.description? $('div').text('settingsApp:',settingsApp.description) : null,

        $('div').append(
          (property.icons||'').split(',').filter(Boolean).map(name => $('span').class('icon',name)),
          menuSettings ? $('span').class('icon menuSettings').attr('caption', menuSettings.index+':'+menuSettings.title) : null,
          menuRead ? $('span').class('icon menuRead').attr('caption', menuRead.index+':'+menuRead.title) : null,
          settingsApp ? $('span').class('icon settingsApp').attr('caption', settingsApp.title || '?') : null,
          oxyconnect ? $('span').class('icon oxyconnect').attr('caption', oxyconnect.title || '?') : null,
          isAhu ? $('span').class('icon isAhu').attr('caption', isAhu) : null,
          isStand ? $('span').class('icon isStand').attr('caption', isStand) : null,
          isAqua ? $('span').class('icon isAqua').attr('caption', isAqua) : null,
        ),
        $('div').text(property.tag).class('code'),
        $('div').text([
          (property.connection||{}).pin,
          (property.connection||{}).jack,
          (property.connection||{}).conn,
          (property.connection||{}).name,
          (property.connection||{}).functionName,
        ].filter(Boolean).join(' / ')).class('code'),
        $('div').text([
          // property.name.upperCaseName(),
          property.name,
        ].filter(Boolean).join(' / ')).class('code'),
      );
      if (options) {
        options.forEach((option,i) => {
          if (option.description) {
            $('div').parent(elem).text(`${i}: ${option.description}`);
          }
        });
      }
      // if (property.connection) {
      //   $('div').parent(elem).html(`Connection: <code>${[
      //     [property.connection.slot,property.connection.pin].filter(Boolean).join('.'),
      //     (property.connection||{}).jack,
      //     property.connection.conn,
      //     property.connection.name,
      //     property.connection.functionName,
      //   ].filter(Boolean).join('/')}</code>`);
      // }
      // if (property.modbus) {
      //   const {device,fc,register,identifier,readWrite,description} = property.modbus;
      //   $('div').parent(elem).text('Modbus:',JSON.stringify({device,fc,register,identifier,readWrite,description}).replace(/","/g,'; ').replace(/\{|\}|"/g,''));
      // }
      // if (menuSettings) {
      //   $('div').parent(elem).style('color:green;').append(
      //     $('div').class('code').text(`${menuSettings.index}:${menuSettings.title}`),
      //     $('div').text(menuSettings.description),
      //   )
      // }
      // if (menuRead) {
      //   $('div').parent(elem).style('color:blue;').append(
      //     $('div').class('code').text(`${menuRead.index}:${menuRead.title}`),
      //     $('div').text(menuRead.description),
      //   )
      // }
      // if (settingsApp) {
      //   $('div').parent(elem).style('color:red;').append(
      //     $('div').class('code').html(`${settingsApp.title} <small>(${settingsApp.tabname}>${settingsApp.groupbox})</small>`),
      //     $('div').text(settingsApp.description),
      //   )
      // }
      // if (oxyconnect) {
      //   $('div').parent(elem).style('color:orange;').append(
      //     $('div').class('code').text(`${oxyconnect.title}`),
      //     // $('div').text(oxyconnect.description);
      //   )
      // }

      return elem;
    }
    function propertyDefinition(property){
      if (property.options) {
        return property.options.map((option,i) => $('div').style('white-space:nowrap;').text(`${i}: ${option.title}${i == property.default ? '*' : ''}`));
      }
      const res = [];
      if ('min' in property) res.push(property.min + '~' + (property.max||''));
      if ('dec' in property) res.push(`${property.min/property.dec}~${property.max/property.dec}${property.unit}`);
      if ('defaultValue' in property) res.push(property.defaultValue+'*');
      return res.filter(Boolean).join('; ');
      // return [
      //   'min' in property ? [
      //     $('span').text(property.min + '~' + (property.max||'')),
      //     property.dec ? $('span').text(`${property.min/property.dec}~${property.max/property.dec}${property.unit}`).style('white-space:nowrap;') : null,
      //   ] : null,
      //   property.defaultValue ? property.defaultValue+'*' : null,
      // ].filter(Boolean).join('; ');
      //
      // return [
      //   'min' in property ? [
      //     $('span').text(property.min + '~' + (property.max||'')),
      //     property.dec ? $('span').text(`${property.min/property.dec}~${property.max/property.dec}${property.unit}`).style('white-space:nowrap;') : null,
      //   ] : null,
      //   property.defaultValue ? property.defaultValue+'*' : null,
      // ];
    }
    function modbusTable(title, properties){
      console.debug(properties);
      function fc(property) {
        var {fc,modbus,readOnly} = property;
        var {readWrite} = modbus||{};
        var fc = fc || modbus.fc || 3;
        if (fc==3 && readWrite!='R' && !readOnly) return '3/6/16';
        return fc;
      }
      if (properties.length) {
        return $('table').class('grid').append(
          $('thead').append(
            $('tr').append(
              $('th').text('FC').style('min-width:55px;'),
              $('th').text('Addr.').style('min-width:45px;'),
              $('th').text('Description').style('width:100%;'),
              $('th').text('Definition').style('min-width:5cm;'),
            ),
          ),
          $('tbody').append(
            properties.map(property => $('tr').append(
              $('td').text(fc(property)),
              $('td').text('register' in property ? property.register : (property.modbus||{}).register),
              $('td').append(propertyDescription(property)),
              $('td').append(propertyDefinition(property)),
            ))
          ),
        );
      }
    }
    function propertiesArray(properties){
      Object.entries(properties).forEach(([name,property])=>Object.assign(property,{name}));
      return Array.from(Object.values(properties))
      // .sort((a,b) => ('register' in a ? a.register : a.modbus.register)-('register' in b ? b.register : b.modbus.register))
    }
    function propertiestable(properties){
      // properties.sort((a,b) => ('register' in a ? a.register : a.modbus.register)-('register' in b ? b.register : b.modbus.register))
      return [
        modbusTable('Read/Write Coils (01)', properties.filter(property => (property.fc || (property.modbus||{}).fc) === 1)),
        modbusTable('Read Discrete Inputs (02)', properties.filter(property => (property.fc || (property.modbus||{}).fc) === 2)),
        modbusTable('Read/Write Holding Registers (03)', properties.filter(property => (property.fc || (property.modbus||{}).fc) === 3)),
        modbusTable('Read Input Registers (04)', properties.filter(property => (property.fc || (property.modbus||{}).fc) === 4)),
      ];
    }
    function softwaredoc(){
      $('div').append(
        $('link').rel('stylesheet').href('https://aliconnect.nl/sdk-1.0.0/lib/aim/css/print.css'),
        $('h1').text('Modbus'),
      ).print();
    }
    const detailElems = {
      producten(){
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
        )
      },
      schematics(){
        return $('details').append(
          $('summary').text('PCB 1 Schematics'),
          product.pcb1.map(obj => $('details').append(
            $('summary').text(obj.name),
            $('img').src(obj.src),
          )),
        )
      },
      components(){
        return $('details').append(
          $('summary').text('Components'),
          product.components.map(obj => $('details').append(
            $('summary').text(obj.name),
            $('img').src(obj.src),
            $('ol').append(
              (obj.specs||[]).map(spec => $('li').append($('a').target('spec').text((spec.name || spec.href).split('/').pop().replace(/\.\w+$/,'')).href(spec.href))),
            ),
          )),
        )
      },
      wiring(){
        return $('details').append(
          $('summary').text('Wiring'),
          product.wiring.map(obj => $('details').append(
            $('summary').text(obj.name),
            $('img').src(obj.src),
            $('ol').append(
              (obj.specs||[]).map(spec => $('li').append($('a').target('spec').text((spec.name || spec.href).split('/').pop().replace(/\.\w+$/,'')).href(spec.href))),
            ),
          )),
        )
      },
      componentList(){
        return $('details').append(
          $('summary').text('Component list'),
          $('table').class('grid').append(
            $('thead').append(
              $('tr').append(
                $('th').text('Tag'),
                $('th').text('Description').style('width:100%;'),
                $('th').text('Art. code'),
              ),
            ),
            $('tbody').append(
              product.componentlist.map(item => $('tr').append(
                $('td').text(item.tag),
                $('td').text(item.name),
                $('td').text(item.artCode).style('white-space:nowrap;'),
              ))
            ),
          ),
        )
      },
      cableList(){
        return $('details').append(
          $('summary').text('Cable list'),
          $('table').class('grid').append(
            $('thead').append(
              $('tr').append(
                $('th').text('Tag'),
                $('th').text('Description').style('width:100%;'),
                $('th').text('Size'),
                $('th').text('Type number'),
              ),
            ),
            $('tbody').append(
              product.cablelist.map(item => $('tr').append(
                $('td').text(item.tag),
                $('td').text(item.description),
                $('td').text(item.size),
                $('td').text(item.typeNr).style('white-space:nowrap;'),
              ))
            ),
          ),
        );
      },
    };
    $('.listview').clear().append(
      $('div').style('flex:1 0 0;display:flex;flex-direction:column;').append(
        $('h1').text('Welkom'),
        $('div').append(
          $('button').text('OxyControl 1-C, version 3.9.0 ?').on('click', event => {
            function oxycontrol(){
              const properties = propertiesArray(definitions.oxycontrol.properties);
              properties.filter(property => property.modbus && property.type === 'boolean' && !property.readOnly).forEach((property,register) => Object.assign(property,{fc:1,register}));
              properties.filter(property => property.modbus && property.type === 'boolean' && property.readOnly).forEach((property,register) => Object.assign(property,{fc:2,register}));
              properties.filter(property => property.modbus && property.type === 'integer' && !property.readOnly).forEach((property,register) => Object.assign(property,{fc:3,register}));
              properties.filter(property => property.modbus && property.type === 'integer' && property.readOnly).forEach((property,register) => Object.assign(property,{fc:4,register}));
              return propertiestable(properties.sort((a,b) => a.register-b.register));
            }
            function oxyrio(){
              const properties = propertiesArray(definitions.oxycontrol1.properties).filter(property => property.modbus);
              return propertiestable(properties.sort((a,b) => a.modbus.register-b.modbus.register));
            }

            $('div').style('margin:auto;max-width:18cm;').append(
              $('link').rel('stylesheet').href('https://aliconnect.nl/sdk-1.0.0/lib/aim/css/print.css'),
              $('link').rel('stylesheet').href('https://aliconnect.nl/oxycom/oxycom.github.io/assets/css/print.css'),

              $('h1').text('Inleiding'),
              $('p').append(
                $('table').append(
                  $('tbody').append(
                    $('tr').append(
                      $('td').append(
                        $('span').class('icon makemodbus'),
                      ),
                      $('td').text('Deze gegevens zijn ALLEEN beschikbaar in settingsapp. Moet beschikbaar komen via modbus.'),
                    ),
                    $('tr').append(
                      $('td').append(
                        $('span').class('icon deprecated'),
                      ),
                      $('td').text('Deze gegevens zijn na de upgrade naar OxyControl niet meer in gebruik. De waarde wordt niet meer bijgewerkt.'),
                    ),
                    $('tr').append(
                      $('td').append(
                        $('span').class('icon menuSettings').attr('caption','menuSettings'),
                      ),
                      $('td').text('Deze gegevens zijn te bekijken en/of aan te passen in menu settings.'),
                    ),
                    $('tr').append(
                      $('td').append(
                        $('span').class('icon menuRead').attr('caption','menuRead'),
                      ),
                      $('td').text('Deze gegevens zijn te bekijken en/of aan te passen in menu read.'),
                    ),
                    $('tr').append(
                      $('td').append(
                        $('span').class('icon settingsApp').attr('caption','settingsApp'),
                      ),
                      $('td').text('Deze gegevens zijn te bekijken en/of aan te passen in de settings app.'),
                    ),
                    $('tr').append(
                      $('td').append(
                        $('span').class('icon oxyconnect').attr('caption','oxyconnect'),
                      ),
                      $('td').text('Deze gegevens zijn te bekijken en/of aan te passen in OxyConnect.'),
                    ),
                  ),
                ),
              ),
              $('h2').text('Modbus function codes'),
              $('table').class('grid').append(
                $('thead').append(
                  $('tr').append(
                    $('th').text('Function Code'),
                    $('th').text('Description').style('width:100%;'),
                    $('th').text('Maximum # of coils / registers'),
                  ),
                ),
                $('tbody').append(
                  $('tr').append($('td').text('1'),$('td').text('Read Coil Status'),$('td').text(2000)),
                  $('tr').append($('td').text('2'),$('td').text('Read Input Status'),$('td').text(2000)),
                  $('tr').append($('td').text('3'),$('td').text('Read Holding Registers'),$('td').text(125)),
                  $('tr').append($('td').text('4'),$('td').text('Read Input Registers'),$('td').text(125)),
                  $('tr').append($('td').text('5'),$('td').text('Force Single Coil'),$('td').text(1)),
                  $('tr').append($('td').text('6'),$('td').text('Force Single Register'),$('td').text(1)),
                  $('tr').append($('td').text('15 (0x0F)'),$('td').text('Force Multiple Coils'),$('td').text(800)),
                  $('tr').append($('td').text('16 (0x10)'),$('td').text('Force Multiple Registers'),$('td').text(100)),
                ),
              ),

              $('h1').text('OxyControl'),
              oxycontrol(),

              $('h1').text('OxyRIO'),
              $('p').text('Iedere IntrCooll is voorzien van 1 OxyRIO module welke te benaderen via Modbus RTU.'),
              oxyrio(),
              // propertiestable(properties.sort((a,b) => a.modbus.register-b.modbus.register)),
            ).parent($(document.body).clear());//print();
          }),
          // β
          $('button').text('OxyRio 1.0 α').on('click', event => {
            const properties = propertiesArray(definitions.oxyrio1.properties).filter(property => property.modbus);
            properties.filter(property => property.type === 'boolean' && !property.readOnly).forEach((property,register) => Object.assign(property.modbus,{fc:1,register}));
            properties.filter(property => property.type === 'boolean' && property.readOnly).forEach((property,register) => Object.assign(property.modbus,{fc:2,register}));
            properties.filter(property => property.type === 'integer' && !property.readOnly).forEach((property,register) => Object.assign(property.modbus,{fc:3,register}));
            properties.filter(property => property.type === 'integer' && property.readOnly).forEach((property,register) => Object.assign(property.modbus,{fc:4,register}));
            var lines = [];
            $('div').append(
              $('link').rel('stylesheet').href('https://aliconnect.nl/sdk-1.0.0/lib/aim/css/print.css'),
              propertiestable(properties.sort((a,b) => a.modbus.register-b.modbus.register)),
            ).print();
          }),
          $('button').text('OxyControl 2.0 α').on('click', event => {
            const properties = propertiesArray(definitions.oxycontrol.properties);
            properties.filter(property => property.type === 'boolean' && !property.readOnly).forEach((property,register) => Object.assign(property,{fc:1,register}));
            properties.filter(property => property.type === 'boolean' && property.readOnly).forEach((property,register) => Object.assign(property,{fc:2,register}));
            properties.filter(property => property.type === 'integer' && !property.readOnly).forEach((property,register) => Object.assign(property,{fc:3,register}));
            properties.filter(property => property.type === 'integer' && property.readOnly).forEach((property,register) => Object.assign(property,{fc:4,register}));
            var lines = [];
            $('div').append(
              $('link').rel('stylesheet').href('https://aliconnect.nl/sdk-1.0.0/lib/aim/css/print.css'),
              propertiestable(properties.sort((a,b) => a.register-b.register)),
            ).print();
          }),
          // $('button').text('Modbus list version 2').on('click', doc2),
          // $('button').text('Modbus list version 3').on('click', doc3),
        ),
        $('details').open(true).append(
          $('summary').text('Configurator'),
          $('p').text('Configureer uw eerste unit en pas dan het aantal aan. De configuratie wordt overgenomen.'),
          $('form').class('config').append(
            $('nav').append(
              $('button').text('Send quotation').type('button').on('click', quotation),
              $('button').text('Simulatie').type('button').on('click', sim),
              $('button').text('Software').type('button').on('click', softwaredoc),
              $('button').text('Save').type('button').on('click', save),
            ),
            $('div').append(
              $('label').text('Aantal'),
              $('input').type('number').name('aantal').value(items.length || 1).min(1).max(16).on('change', buildconfig),
              $('label').text('Email'),
              $('input').name('email'),
              $('label').text('System ID'),
              $('input').name('systemId').size(36).value(window.sessionStorage.getItem('systemId')).style('font-family:consolas;'),

            ),
            $('div').class('items'),
          ),
        ),
      ),
    );
    buildconfig();
  });
  Web.treeview.append([
    {
      name: 'Controls',
      icn: 'organization',
      children: [
        {
          name: 'OxyControl',
          $path: serviceRoot + '/oxycontrol',
          $search: '',
          $top: 2000,
        },
      ],
    },
  ]);
}, err => {
  console.error(err);
  $(document.body).append(
    $('div').text('Deze pagina is niet beschikbaar'),
  )
}));
