const serviceRoot = 'https://aliconnect.nl/v1';
const socketRoot = 'wss://aliconnect.nl:444';
console.debug({socketRoot})
Web.on('loaded', (event) => Abis.config({serviceRoot,socketRoot}).init().then(async (abis) => {
  const {config,Client,Prompt,Pdf,Treeview,Listview,Statusbar,XLSBook,authClient,abisClient,socketClient,tags,treeview,listview,account,Aliconnect,getAccessToken} = abis;
  const {num} = Format;
  const url = new URL(document.location);
  const {client_id,forms,costs,info} = config;
  Aim.fetch('https://aliconnect.nl/oxycom/oxycontrol/public/config/product').get().then(product => {
    // console.log(product);
    // window.sessionStorage.clear();
    var units = JSON.parse(window.sessionStorage.getItem('units')) || [{
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
    }];
    // var units = [{}];
    // var data = JSON.parse(window.sessionStorage.getItem('configdata')) || {};
    console.log(units);
    const {producten,systems} = product;
    const {modules,wirediagram} = product.configurator;
    // function unitimage(unit){
    //   return $('div').style('flex:0 0 100px;display:flex;flex-direction:column;max-width:200px;').append(
    //     modules[unit.module||0].unit ? $('img').src(modules[unit.module||0].unit) : null,
    //     modules[unit.module||0].module ? $('img').src(modules[unit.module||0].module) : null,
    //     modules[unit.module||0].shutoff && unit.shutoff ? $('img').src(modules[unit.module||0].shutoff) : null,
    //     modules[unit.module||0].hr && unit.hr ? $('img').src(modules[unit.module||0].hr) : null,
    //     modules[unit.module||0].fan ? $('img').src(modules[unit.module||0].fan) : null,
    //     modules[unit.module||0].hp && unit.hp ? $('img').src(modules[unit.module||0].hp) : null,
    //     // modules[unit.module||0].shutoff && unit.shutoff ? $('img').src(modules[unit.module||0].shutoff.src) : null,
    //   );
    // }
    function buildconfig() {
      const {el} = $('details>form');
      const aantal = Number(el.aantal.value||1);
      // console.log(aantal);
      for (var i=0;i<aantal;i++) {
        units[i]=units[i] || Object.assign(Object.create(units[0]),{mc:0,fps:false,oc:false});
      }
      units.length = aantal;
      // console.log(units);
      // function buildimage(){
      //   $('.configimage').clear().append(
      //     units.map(unitimage),
      //   );
      // }
      function unitElem(unit,i){
        const imageElem = $('div').style('display:flex;');
        function buildimage(event) {
          // console.log(event.target,this)
          Object.assign(unit,Object.fromEntries(new FormData(elem.el).entries()));
          // window.sessionStorage.setItem('configdata', JSON.stringify(data = Object.fromEntries(new FormData(el).entries())));
          window.sessionStorage.setItem('units', JSON.stringify(units));
          console.log(unit,units);
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
          console.log(getElement('hr'));

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

          imageElem.clear().style('border:solid 1px gray;').append(
            $('img').src(`/assets/image/product/cto.png`).style('width:100%;max-height:500px;'),
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
          $('p').text('Configureer uw eerste unit en pas dan het aantal aan. De configuratie wordt overgenomen.'),
          $('form').class('config').append(
            $('div').append(
              $('label').text('Aantal'),
              $('input').type('number').name('aantal').value(units.length || 1).min(1).max(16).on('change', buildconfig),
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
