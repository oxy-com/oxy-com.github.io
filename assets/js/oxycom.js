const serviceRoot = 'https://aliconnect.nl/v1';
const socketRoot = 'https://aliconnect.nl:444';
Web.on('loaded', (event) => Abis.config({serviceRoot,socketRoot}).init().then(async (abis) => {
  const {config,Client,Prompt,Pdf,Treeview,Listview,Statusbar,XLSBook,authClient,abisClient,socketClient,tags,treeview,listview,account,Aliconnect,getAccessToken} = abis;
  const {num} = Format;
  const url = new URL(document.location);
  const {client_id,forms,costs,info} = config;
  Aim.fetch('https://aliconnect.nl/oxycom/oxycontrol/public/config/product').get().then(product => {
    // console.log(product);
    var units = [{}];
    const {producten,systems} = product;
    const {modules,wirediagram} = product.configurator;
    function unitimage(unit){
      return $('div').style('flex:0 0 100px;display:flex;flex-direction:column;max-width:200px;').append(
        modules[unit.module||0].unit ? $('img').src(modules[unit.module||0].unit) : null,
        modules[unit.module||0].module ? $('img').src(modules[unit.module||0].module) : null,
        modules[unit.module||0].shutoff && unit.shutoff ? $('img').src(modules[unit.module||0].shutoff) : null,
        modules[unit.module||0].hr && unit.hr ? $('img').src(modules[unit.module||0].hr) : null,
        modules[unit.module||0].fan ? $('img').src(modules[unit.module||0].fan) : null,
        modules[unit.module||0].hp && unit.hp ? $('img').src(modules[unit.module||0].hp) : null,
        // modules[unit.module||0].shutoff && unit.shutoff ? $('img').src(modules[unit.module||0].shutoff.src) : null,
      );
    }
    function buildconfig() {
      const {el} = $('details>form');
      // console.log(el);
      const aantal = Number(el.aantal.value||1);
      // console.log(aantal);
      for (var i=0;i<aantal;i++) {
        units[i]=units[i] || {};
      }
      units.length = aantal;
      // console.log(units);
      // function buildimage(){
      //   $('.configimage').clear().append(
      //     units.map(unitimage),
      //   );
      // }
      function unitElem(unit,i){
        const imageElem = $('div').style('display:flex;max-height:300px;');
        function buildimage() {
          // const mod = modules[unit.module||0];
          const types = ['ic','ic-nv','ic-fk','ic-sf'];
          const cfg = [types[unit.module||0]];
          if (unit.filter) cfg.push('f'+unit.filter);
          // if (unit.desinf) cfg.push('d'+unit.desinf);
          // console.log(unit)
          // const {type,shutoff,hr,fan,hp,hrHeating,coilFreezeProtection,supplyFreezeProtection} = unit;
          const name = cfg.concat([
            'so',
            'hr',
            'hrh',
            'heat',
            'fan',
            'hpf',
            // 'coilFreezeProtection',
            // 'supplyFreezeProtection',
          ].filter(key => unit[key])).join('-') + '.png';
          // console.log(name);
          imageElem.clear()
          // .style('display:flex;flex-direction:column;')
          .append(
            $('img').src('/assets/image/product/'+name).style('object-fit: contain;object-position: top;max-height:300px;'),
            unit.mc ? $('img').src(`/assets/image/product/mc${unit.mc}.png`).style('object-fit: contain;object-position: top;max-width:100px;') : null,
            unit.desinf ? $('img').src(`/assets/image/product/d${unit.desinf}.png`).style('object-fit: contain;object-position: top;max-width:100px;') : null,
            unit.coilFreezeProtection ? $('img').src('/assets/image/product/coilFreezeProtectionSet.png').style('object-fit: contain;object-position: top;max-height:100px;') : null,
            unit.waterSupplyFreezeProtectionSet ? $('img').src('/assets/image/product/waterSupplyFreezeProtectionSet.png').style('object-fit: contain;object-position: top;max-height:100px;') : null,
            // $('img').src('/assets/image/product/'+name).style('width:100%;'),
            // $('img').src(name),
            // $('img').src(name),

            // modules[unit.module||0].unit ? $('img').src(modules[unit.module||0].unit) : null,
            // modules[unit.module||0].module ? $('img').src(modules[unit.module||0].module) : null,
            // modules[unit.module||0].shutoff && unit.shutoff ? $('img').src(modules[unit.module||0].shutoff) : null,
            // modules[unit.module||0].hr && unit.hr ? $('img').src(modules[unit.module||0].hr) : null,
            // modules[unit.module||0].fan ? $('img').src(modules[unit.module||0].fan) : null,
            // modules[unit.module||0].hp && unit.hp ? $('img').src(modules[unit.module||0].hp) : null,
            // modules[unit.module||0].shutoff && unit.shutoff ? $('img').src(modules[unit.module||0].shutoff.src) : null,
          );
        }
        const elem = $('div')
        // .style('display:flex;')
        .append(
          $('div')
          // .style('flex:0 0 50%;')
          .append(
            $('div').append(
              $('label').text('Master control: '),
              ['None','Thermostat','Programmable','OxyConnect','Modbus','Analog input'].map((f,x) => [
                $('input').type('radio').id('mc'+f+i).name('mc'+i).checked((unit.mc=i===0 ? 2 : 0)===x).on('change', event => buildimage(unit.mc=x)),
                $('label').text(f).for('mc'+f+i),
              ]),
            ),
            $('div').append(
              $('label').text('Filter: '),
              ['None','G3','G4','M5','F7'].map((f,x) => [
                $('input').type('radio').id('filter'+f+i).name('filter'+i).checked((unit.filter=0)===x).on('change', event => buildimage(unit.filter=x)),
                $('label').text(f).for('filter'+f+i),
              ]),
            ),
            $('div').append(
              $('label').text('Water desinfection: '),
              ['None','Ozone','UV/C','Chlorine Dioxine'].map((f,x) => [
                $('input').type('radio').id('desinf'+f+i).name('desinf'+i).checked((unit.desinf=0)===x).on('change', event => buildimage(unit.desinf=x)),
                $('label').text(f).for('desinf'+f+i),
              ]),
            ),
            $('div').append(
              $('label').text('Freeze protection: '),
              $('input').type('checkbox').id('coilFreezeProtection'+i).name('coilFreezeProtection'+i).checked(unit.coilFreezeProtection).on('change', event => buildimage(unit.coilFreezeProtection = event.target.checked)),
              $('label').text('Coil').for('coilFreezeProtection'+i),

              $('input').type('checkbox').id('waterSupplyFreezeProtectionSet'+i).name('waterSupplyFreezeProtectionSet'+i).checked(unit.waterSupplyFreezeProtectionSet).on('change', event => buildimage(unit.waterSupplyFreezeProtectionSet = event.target.checked)),
              $('label').text('Water Supply').for('waterSupplyFreezeProtectionSet'+i),
            ),
            $('div').append(
              $('label').text('Model: '),
              $('input').type('radio').id('basic'+i).name('module'+i).checked(!unit.module).on('change', event => buildimage(unit.module = 0)),
              $('label').text('Basic').for('basic'+i),
              $('input').type('radio').id('nv'+i).name('module'+i).checked(unit.module == 1).on('change', event => buildimage(unit.module = 1)),
              $('label').text('NV-Module').for('nv'+i),
              $('input').type('radio').id('flash'+i).name('module'+i).checked(unit.module == 2).on('change', event => buildimage(unit.module = 2)),
              $('label').text('Flashing-Kit').for('flash'+i),
              $('input').type('radio').id('frame'+i).name('module'+i).checked(unit.module == 3).on('change', event => buildimage(unit.module = 3)),
              $('label').text('Support-frame').for('frame'+i),
              $('input').type('checkbox').id('so'+i).name('so'+i).checked(unit.so).on('change', event => buildimage(unit.so = event.target.checked)),
              $('label').text('Shutoff damper').for('so'+i),
            ),
            $('div').append(
              $('label').text('Option HR: '),
              $('input').type('radio').id('hrx'+i).name('hr'+i).checked(!unit.hr && !unit.hrh).on('change', event => buildimage(unit.hrh = false, unit.hr = false)),
              $('label').text('None').for('hrx'+i),
              $('input').type('radio').id('hr'+i).name('hr'+i).checked(unit.hr).on('change', event => buildimage(unit.hrh = false, unit.hr = true)),
              $('label').text('Vertical').for('hr'+i),
              $('input').type('radio').id('hrh'+i).name('hr'+i).checked(unit.hrh).on('change', event => buildimage(unit.hrh = true, unit.hr = false)),
              $('label').text('Horizontal').for('hrh'+i),
              $('input').type('checkbox').id('heat'+i).name('heat'+i).checked(unit.heat).on('change', event => buildimage(unit.heat = event.target.checked)),
              $('label').text('Option Heating').for('heat'+i),
            ),
            $('div').append(
              $('label').text('Ventilation: '),
              $('input').type('checkbox').id('hpf'+i).name('hpf'+i).checked(unit.hpf).on('change', event => buildimage(unit.hpf = event.target.checked)),
              $('label').text('HP-Module').for('hpf'+i),
            ),
          ),
          imageElem,
        )
        buildimage();
        return elem;
      }
      $('.units').clear().append(
        $('ol').append(
          units.map(unitElem),
        ),
        // $('div').class('configimage').style('display:flex;flex-wrap:wrap;'),
      );
      // buildimage();
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
      const diagrams = [].concat(...units.map(unit => modules[unit.module||0]).map(mod => mod.wirediagram)).unique();
      console.log(diagrams);

      $('div').append(
        $('h1').text('Quotation'),
        $('h1').text('Units'),
        units.map((unit,i) => [
          $('h2').text('Unit', i+1),
          unitimage(unit),
        ]),
        $('h1').text('Wiring Diagram'),
        diagrams.map(nr => wirediagram[nr]).map(diagram => $('img').src(diagram.src)),
      ).print();
    }

    function propertyDescription(property){
      const elem = $('div').append(
        $('div').text(property.name.displayName()).style('font-weight:bold;'),
        $('div').text([
          (property.connection||{}).pin,
          (property.connection||{}).jack,
          (property.connection||{}).conn,
          (property.connection||{}).name,
          (property.connection||{}).functionName,
        ].filter(Boolean).join(' / ')).class('code'),
        $('div').text([
          property.name.upperCaseName(),
          property.name,
        ].filter(Boolean).join(' / ')).class('code'),
        $('div').text(property.description),
      );
      if (property.options) {
        property.options.forEach((option,i) => {
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
      if (property.modbus) {
        $('div').parent(elem).html(`Modbus addres: ${property.modbus.addressProperty}, fc: ${property.modbus.fc}, address: ${property.modbus.register}`);
      }

      if (property.menuRead) {
        $('div').parent(elem).html(`PCB menu read: <span class=code>${property.menuRead.index} - ${property.menuRead.title}</span> (${property.menuRead.description})`);
      }
      if (property.menuSetting) {
        $('div').parent(elem).html(`PCB menu setting: <span class=code>${property.menuSetting.index} - ${property.menuSetting.title}</span> (${property.menuSetting.description})`);
      }
      if (property.settingsApp) {
        $('div').parent(elem).html(`PC settings app: <span class=code>${property.settingsApp.tabname} > ${property.settingsApp.groupbox} > ${property.settingsApp.title}:</span>`);
      }
      if (property.oxyconnect) {
        $('div').parent(elem).text('OxyConnect web app:',property.oxyconnect.title);
      }

      return elem;
    }
    function propertyDefinition(property){
      if (property.options) {
        return property.options.map((option,i) => $('div').style('white-space:nowrap;').text(`${i}: ${option.title}${i == property.default ? '*' : ''}`));
      }
      return [
        'min' in property ? [
          $('div').text(property.min + '~' + (property.max||'')),
          property.dec ? $('div').text(`${property.min/property.dec}~${property.max/property.dec}${property.unit}`).style('white-space:nowrap;') : null,
        ] : null,
      ];
    }
    function modbusTable(title, properties){
      console.debug(properties);
      if (properties.length) {
        return $('details').open(true).append(
          $('summary').append(title),
          $('table').class('grid').append(
            $('thead').append(
              $('tr').append(
                $('th').text('Addr.'),
                $('th').text('Description').style('width:100%;'),
                $('th').text('Definition').style('min-width:5cm;'),
              ),
            ),
            $('tbody').append(
              properties.map(property => $('tr').append(
                $('td').text(property.register || property.modbus.register),
                $('td').append(propertyDescription(property)),
                $('td').append(propertyDefinition(property)),
              ))
            ),
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
        modbusTable('Read/Write Coils (01)', properties.filter(property => property.modbus && property.modbus.fc === 1)),
        modbusTable('Read Discrete Inputs (02)', properties.filter(property => property.modbus && property.modbus.fc === 2)),
        modbusTable('Read/Write Holding Registers (03)', properties.filter(property => property.modbus && property.modbus.fc === 3)),
        modbusTable('Read Input Registers (04)', properties.filter(property => property.modbus && property.modbus.fc === 4)),
      ];
    }


    $('.listview').clear().append(
      $('div').style('flex:1 0 0;display:flex;flex-direction:column;').append(
        $('h1').text('Welkom'),
        $('div').append(
          $('button').text('OxyControl 1-C, version 3.9.0 ?').on('click', event => {
            const properties = propertiesArray(systems.oxycontrol1.properties)
            .filter(property => property.modbus)

            var lines = [];
            $('div').append(
              $('link').rel('stylesheet').href('https://aliconnect.nl/sdk-1.0.0/lib/aim/css/print.css'),
              propertiestable(properties.sort((a,b) => a.modbus.register-b.modbus.register)),
            ).print();
          }),
          // β
          $('button').text('OxyRio 1.0 α').on('click', event => {
            const properties = propertiesArray(systems.oxyrio1.properties).filter(property => property.modbus);
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
            const properties = propertiesArray(systems.oxycontrol.properties);
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
          $('form').class('config').append(
            $('div').append(
              $('label').text('Aantal'),
              $('input').type('number').name('aantal').value(1).min(1).max(16).on('change', buildconfig),
              $('label').text('Email'),
              $('input').name('email'),
              $('button').text('Send quotation').type('button').on('click', quotation)
            ),
            $('div').class('units'),
          ),
        ),
        $('details').append(
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
        ),
        $('details').append(
          $('summary').text('PCB 1 Schematics'),
          product.pcb1.map(obj => $('details').append(
            $('summary').text(obj.name),
            $('img').src(obj.src),
          )),
        ),
        $('details').append(
          $('summary').text('Components'),
          product.components.map(obj => $('details').append(
            $('summary').text(obj.name),
            $('img').src(obj.src),
            $('ol').append(
              (obj.specs||[]).map(spec => $('li').append($('a').target('spec').text((spec.name || spec.href).split('/').pop().replace(/\.\w+$/,'')).href(spec.href))),
            ),
          )),
        ),
        $('details').append(
          $('summary').text('Wiring'),
          product.wiring.map(obj => $('details').append(
            $('summary').text(obj.name),
            $('img').src(obj.src),
            $('ol').append(
              (obj.specs||[]).map(spec => $('li').append($('a').target('spec').text((spec.name || spec.href).split('/').pop().replace(/\.\w+$/,'')).href(spec.href))),
            ),
          )),
        ),

        $('details').append(
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
        ),

        $('details').append(
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
