const serviceRoot = 'https://aliconnect.nl/v1';
const socketRoot = 'wss://aliconnect.nl:444';
Web.on('loaded', (event) => Abis.config({serviceRoot,socketRoot}).init().then(async (abis) => {
  const {config,Client,Prompt,Pdf,Treeview,Listview,Statusbar,XLSBook,authClient,abisClient,socketClient,tags,treeview,listview,account,Aliconnect,getAccessToken} = abis;
  config({
    definitions: {
      oxycontrol: {
        prototype: {
          get itemdata(){
            // this.systemConfig = {};
            const {systemConfig} = this;
            return {type:'oxycontrol',data:systemConfig};
          },
          async sim(sim){
            const itemId = this.id;//el.systemId.value;
            const items = [this.itemdata];
            const {el} = $('details>form');
            config({itemId,items});
            const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJhenAiOiJmN2JhZGNiMy1kMTE0LTQ5NGYtODQ5MC0zY2ZkYWQ2YzI4Y2UiLCJzdWIiOiJlYzJiMTFmOC00NmU0LTQzY2MtYWI3Zi0wMDFiMTUwOGU1ZjIiLCJpYXQiOjE2Nzc2NjA0MTUsImV4cCI6MTY3NzY2NDAxNX0.YEG__elf5Sx6tbZUl-MwcldWv3457eJJ-D_FZ9Xjxpo';
            const serviceRoot = 'https://aliconnect.nl:444';
            function getAccessToken(){ return apiKey; }
            const socketClient = Client.create({serviceRoot,getAccessToken});
            await socketClient.connect();
            const storage = window.sessionStorage;
            $('link').parent(document.head).rel('stylesheet').href('https://aliconnect.nl/oxycom/oxycontrol/public/assets/css/gui.css');
            Oxycontrol.init().then(items => {
              console.log(items);

              // Aim.systemBuild({storage});
              Aim.systemBuild();
              // return;
              items.forEach(item => item.init());
              if (sim) {
                items.forEach(item => Object.values(item.properties).forEach(property => property.readOnly = null));
                items.forEach(item => item.sim());
              }
              return Oxycontrol.gui();
            });
          },
          async save() {
            console.log('SAVING', this.itemdata);
            const {el} = $('pageview form');
            const itemId = this.id;
            const items = [this.itemdata];
            // window.sessionStorage.setItem('systemId', this.id);
            await abisClient.api('/json').body({
              filename: '/oxycom/config/'+this.id,
              content: {itemId,items},
            }).post().then(body => config(body));
          },
          get pageNav() { return [
            $('button').class('icn-save').text('Save').on('click', event => this.save()),
            $('button').class('icn-tag').text('Simulate').on('click', event => this.sim(true)),
            $('button').class('icn-edit').on('click', event => this.pageElem(true)),
          ]},
        },
      },
    },
  });


  const {num} = Format;
  const url = new URL(document.location);
  const {client_id,forms,costs,info} = config;
  Aim.fetch('https://aliconnect.nl/oxycom/oxycontrol/public/config/product').get().then(product => {
    config(product);
    // console.debug(config.definitions);



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
    // console.log(items);
    config({items});
    const {definitions,producten,configurator,builder,partslist} = config;

    Object.values(definitions).forEach(schema => (schema.fbs||[]).forEach(item => Object.assign(schema.properties.systemConfig.properties, Object.fromEntries(
      Object.entries(item.properties||{}).filter(([name,property]) => (property.visibility||'').split(',').includes('po'))
    ))));

    const {properties} = definitions.oxycontrol;

    partslist.forEach(part => Object.assign(properties, part.properties));
    // product.fbs.forEach(part => Object.assign(properties, part.properties));


    // window.sessionStorage.clear();
    // var items = [defaultUnit];
    const {modules,wirediagram} = configurator;
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


    function Property(property) {
      return Object.create({
        legend(){
          const {legendDescription,src} = property;
          if (legendDescription) return [
            src ? $('img').src(src).style('max-width:200px;max-height:200px;object-fit:contain;float:right;') : null,
            legendDescription.map(line => $('p').text(line)),
          ];
        },
        description(type = 0){
          const {options,menuSettings,menuRead,settingsApp,oxyconnect,config,modbus} = property;
          const {isAhu,isStand,isAqua} = config||{};
          const descriptionStyle = '';//'font-style:italic;';
          const elem = $('div').append(
            // $('div').text(property.name.displayName()).style('font-weight:bold;'),
            $('div').append(
              property.title || property.description || property.name.displayName(),
              property.version ? $('sup').class('version').text(property.version) : null,
            ),
            $('div').text(property.title ? property.description : null),

            // $('div').text((menuSettings||{}).description),
            // $('div').text((settingsApp||{}).description),

            // menuSettings && menuSettings.description? $('div').text('menuSettings:',menuSettings.description) : null,
            // menuRead && menuRead.description? $('div').text('menuRead:',menuRead.description) : null,
            // settingsApp && settingsApp.description? $('div').text('settingsApp:',settingsApp.description) : null,

            $('div').append(
              (property.state||'').split(',').filter(Boolean).map(name => $('span').class('icon',name)),
              // menuSettings ? $('span').class('icon menuSettings').attr('caption', menuSettings.index+':'+menuSettings.title) : null,
              // menuRead ? $('span').class('icon menuRead').attr('caption', menuRead.index+':'+menuRead.title) : null,
              // settingsApp ? $('span').class('icon settingsApp').attr('caption', settingsApp.title || '?') : null,
              // oxyconnect ? $('span').class('icon oxyconnect').attr('caption', oxyconnect.title || '?') : null,
              // isAhu ? $('span').class('icon isAhu').attr('caption', isAhu) : null,
              // isStand ? $('span').class('icon isStand').attr('caption', isStand) : null,
              // isAqua ? $('span').class('icon isAqua').attr('caption', isAqua) : null,
            ),

            type === 1 ? [
              $('div').text(property.tag).class('code'),
              $('div').text(property.name).class('code'),
              modbus ? $('div').text([modbus.device,modbus.fc,modbus.register,modbus.identifier].join('/')).class('code') : null,
              $('div').text([
                (property.connection||{}).pin,
                (property.connection||{}).jack,
                (property.connection||{}).conn,
                (property.connection||{}).name,
                (property.connection||{}).functionName,
              ].filter(Boolean).join(' / ')).class('code'),
            ] : null,
          );
          if (options) {
            options.forEach((option,i) => {
              const text = [];
              if (option.description || option.settings) {
                // $('div').parent(elem).style('padding-left:20px;text-indent:-20px;')
                // .text([`${i}: ${option.description}`].concat(Object.entries(option.settings||{}).map(([n,v]) => `${properties[n].title}: ${v} ${properties[n].unit}`)).join(', '))
                // .append(
                //   option.src ? $('img').src(option.src).style('max-height:50px;display:block;') : null,
                // )
                $('p').parent(elem).style('display:flex;').append(
                  $('span').style('white-space:nowrap;flex:0 0 20px;').text(i+': '),
                  $('div').style('flex:1 0 0;').append(
                    option.description,
                    Object.entries(option.settings||{}).map(([n,v]) => $('li').text(`${properties[n].title||n}: ${v} ${properties[n].unit||''}`)),
                  ),
                  // $('span').style('flex:1 0 0;').text([`${option.description}`].concat(Object.entries(option.settings||{}).map(([n,v]) => `${properties[n].title}: ${v} ${properties[n].unit}`)).join(', ')),
                  option.src ? $('img').src(option.src).style('width:80px;max-height:80px;object-fit:contain;') : null,
                )
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
        },
        definition(){
          if (property.options) {
            if (property.type === 'boolean' && property.options[0].title === 'Off') return $('div').style('white-space:nowrap;').text('0: Off, 1: On');
            return property.options.map((option,i) => $('div').style('white-space:nowrap;').class(option.deprecated?'deprecated':'').text(`${i}: ${option.name || option.title}${i == property.default ? '*' : ''}`));
          }
          const res = [];
          if ('min' in property) res.push(property.min + '..' + (property.max||''));
          if ('defaultValue' in property) res.push(property.defaultValue+'*');
          if ('dec' in property) res.push(`${property.min/property.dec}..${property.max/property.dec}${property.unit}`);
          else if ('unit' in property) res.push(property.unit);
          return res.filter(Boolean).join('; ');
        },
      });
    }

    function propertiesArray(properties){
      Object.entries(properties).forEach(([name,property])=>Object.assign(property,{name}));
      return Array.from(Object.values(properties))
    }
    function functioncode(fc,property) {
      var {modbus,readOnly} = property;
      // var {readWrite} = modbus||{};
      fc = fc || 3;
      if (fc==3 && !readOnly) return '3/6/16';
      if (fc==6 && !readOnly) return '6/16';
      if (fc==1 && !readOnly) return '1/5/15';
      if (fc==5 && !readOnly) return '5/15';
      return fc;
    }
    function modbusTables(modbuslist, level = 3) {
      // console.log({modbuslist});
      const titles = ['Read/Write Coils (1/5/15)','Read Discrete Inputs (2)','Read/Write Holding Registers (3/6/16)','Read Input Registers (4)'];
      return titles.map((title,fc)=>{
        if (modbuslist[fc].length) {
          return [
            $('h'+level).text(title),
            $('table').class('grid').append(
              $('thead').append(
                $('tr').append(
                  $('th').text('FC').style('min-width:55px;'),
                  $('th').text('Addr.').style('min-width:45px;'),
                  $('th').text('Description').style('width:100%;'),
                  $('th').text('Definition').style('min-width:5cm;'),
                ),
              ),
              $('tbody').append(
                modbuslist[fc].sort((a,b)=>a.register-b.register).map((property,i) => $('tr').append(
                  $('td').text(functioncode(property.fc,property)),
                  $('td').text(property.register),//'register' in property ? property.register : (property.modbus||{}).register),
                  $('td').append(Property(property).description()),
                  $('td').append(Property(property).definition()),
                ))
              ),
            ),
          ];
        }
      })
    }
    function buildSetup(obj){
      const {list,style} = obj;
      const parentElem = $('div');
      var imageElem = $('div').class('hmi-image').parent(parentElem).style('zoom:50%;');
      const {el} = imageElem;
      const partsElem = $('tbody').parent(
        $('table').parent(parentElem).append(
          $('thead').append(
            $('tr').append(
              $('th').text('Omschrijving').style('width:100%;'),
              $('th').text('Art.nr.').style('min-width:80px;'),
              $('th').text('Gewicht').style('text-align:right;min-width:80px;'),
              $('th').text('Prijs').style('text-align:right;min-width:80px;'),
            ),
          ),
        )
      );
      (list||[]).forEach(item => imageElem = $('div').parent(imageElem).class(item.name).append(
        (item.children||[]).map(child => $('div').class(child.name)),
      ));
      (list||[]).forEach(item => {
        partslist.filter(part => part.name === item.name).forEach(part => {
          const {partslist} = part;
          (partslist||[]).forEach(part => $('tr').parent(partsElem).append(
            $('td').text(part.name || part.title || part.description || item.name),
            $('td').text(part.artnr).style('text-align:right;'),
            $('td').text(num(part.weight||'',1)).style('text-align:right;'),
            $('td').text(num(part.price||'')).style('text-align:right;'),
          ));
        });
      })
      setTimeout(e => el.style.height = (el.scrollHeight+20)+'px');
      return parentElem;
    }
    function docbuild(event){
      const {versions,abbreviations,obs,sbs} = config;
      const propertiesArr = propertiesArray(definitions.oxycontrol.properties);
      var legend = 'General';
      propertiesArr.forEach(property => property.legend = legend = property.legend || legend);
      const modbusProperties = assignModbus(propertiesArr.filter(property => property.visibility && property.visibility.split(',').includes('modbus')));
      function modbusReadProperties(name) {
        return propertiesArr
          .filter(property => property.modbus && !property.modbus.optional && property.modbus.device === name)
          .map(property => Object.setPrototypeOf(property.modbus, property)
        );
      }
      function oxyrio(){
        const properties = propertiesArray(definitions.oxycontrol.properties).filter(property => property.modbus && property.modbus.device === 'oxyrio');
        return propertiesTable(properties.sort((a,b) => a.modbus.register-b.modbus.register));
      }
      function oxyrio2(){
        const properties = propertiesArray(definitions.oxycontrol.properties).filter(property => property.settingsApp && !property.modbus);
        properties.forEach((property,i) => property.modbus = {
          device: 'oxyrio',
          fc: 3,
          register: '?',
        });
        return propertiesTable(properties);
      }
      function propTable(properties, level = 3){
        return modbusTables([
          // properties.filter(property => property.type === 'boolean' && !property.readOnly),
          // properties.filter(property => property.type === 'boolean' && property.readOnly),
          // properties.filter(property => property.type === 'integer' && !property.readOnly),
          // properties.filter(property => property.type === 'integer' && property.readOnly),
          properties.filter(property => [1,5,15].includes(property.fc)),
          properties.filter(property => [2].includes(property.fc)),
          properties.filter(property => [3,6,16].includes(property.fc)),
          properties.filter(property => [4].includes(property.fc)),
        ], level)
      }
      function propertiesElem(properties){
        if (Array.isArray(properties)) {
          return properties.map(line => $('li').class('flex').append(
            typeof line === 'object'
            ? $('span').html(Array.from(Object.entries(line||{})).map(([name,value])=>`${name}: ${value}`).join('<br>'))
            : line
          ));
        }
        return $('table').append(
          Array.from(Object.entries(properties||{})).map(([name,value])=>$('tr').append(
            $('td').text(name),
            $('td').style('width:40%;').text(value),
          ))
        );
      }
      function docItemProperties(obj){
        return Array.from(Object.entries(obj||{})).map(([title,properties])=>[
          $('summary').text(title),
          propertiesElem(properties),
        ]);
      }
      function paragraph(line) {
        if (Array.isArray(line)) return line.map(paragraph).join('<br>');
        if (typeof line === 'object') return Array.from(Object.entries(line)).map(([name,value]) => [name,paragraph(value)].join(': '));
        return line;
      }
      function description(item){
        return $('div').class('description').append(
          item.src ? $('img').src(item.src) : null,
          [item.description].flat().filter(Boolean).map(line => $('p').text(paragraph(line))),
          ['note','idea','warning','todo','bug','debug'].map(name => [item[name]].flat().filter(Boolean).map(line => $('blockquote').class(name).text(paragraph(line)))),

          docItemProperties(item.info||{}),

          item.partslist ? [
            $('p').text('Stuklijst / Bestelinformatie').style('font-weight: bold;'),
            $('table').class('grid').append(
              $('thead').append(
                $('th').text('Pos').style('min-width:15mm;'),
                $('th').text('Omschrijving').style('width:100%;'),
                $('th').text('Afmeting').style('min-width:40mm;'),
                $('th').text('Gewicht').style('min-width:15mm;'),
                $('th').text('Art.nr.').style('min-width:20mm;'),
              ),
              $('tbody').append(
                item.partslist.map(part => $('tr').append(
                  $('td').text(part.pos || part.tag),
                  $('td').text(part.title || part.name || part.description),
                  $('td').text(part.dimensions),
                  $('td').text(part.weight),
                  $('td').text(part.artnr || part.artCode).style('white-space:nowrap;'),
                )),
              ),
            )
          ] : null,

          item.settings ? [
            $('p').text('Instellingen').style('font-weight: bold;'),
            $('table').class('grid').append(
              $('thead').append(
                $('th').text('Omschrijving').style('width:100%;'),
                $('th').text('Waarde').style('min-width:20mm;'),
              ),
              $('tbody').append(
                Object.entries(item.settings).map(([name,item]) => $('tr').append(
                  $('td').text(name),
                  $('td').text(item),
                )),
              ),
            )
          ] : null,

          item.specs ? [
            $('p').text('Technische documentatie').style('font-weight: bold;'),
            $('ul').append(
              item.specs.map(item => $('li').append(
                $('a').target('spec').text(item.title || item.href.split('/').pop()).href(encodeURI(item.href)),
              )),
            ),
          ] : null,


          (item.options||[]).filter(item => item.title).map((item,i) => [
            $('p').text(i+': '+item.title).style('font-weight: bold;'),
            description(item),
          ]),

          // (item.options||[]).filter(item => item.title).map(item => [
          //   $('h4').text(item.title || item.name),
          //   item.src ? $('img').class('image-option').src(item.src) : null,
          // ]),

        );
      }

      return $('.listview').clear().loadPage().then(elem => {
        elem.class('headerindex').append(
          $('h1').text('Inleiding'),
          $('h1').text('Testplan'),
          definitions.oxycontrol.fat.map(item => [
            $('h2').text(item.title),
            $('table').append(
              $('thead').append(
                $('tr').append(
                  $('th').text('#'),
                  $('th').text('Do / Check'),
                  // $('th').text('Check'),
                  $('th').text('Ok'),
                ),
              ),
              $('tbody').append(
                (item.list||[]).map((item,i) => $('tr').append(
                  $('td').text(i+1),
                  $('td').append(
                    paragraph(item.do),
                    (item.check||[]).map((item,i) => $('li').text(item)),
                  ),
                  // $('td').append(paragraph(item.check)),
                  //   (item.do||[]).map((item,i) => $('li').text(paragraph(item))),
                  // ),
                  // $('td').append(
                  //   (item.check||[]).map((item,i) => $('div').text('[ ]',item)),
                  // ),
                  $('td'),
                )),
              ),
            ),
          ]),
        )
      });


      $('.listview').clear().loadPage().then(elem => {
        elem.class('headerindex').append(
          $('h1').text('Inleiding'),
          $('h2').text('Organisation Breakdown Structure'),
          $('table').append(
            $('thead').append(
              $('tr').append(
                $('th').text('Name'),
                // $('th').text('EMail'),
                $('th').text('Role / Job title'),
                $('th').text('Company'),
              )
            ),
            $('tbody').append(
              obs.sort((a,b)=>a.name.localeCompare(b.name)).map(item => $('tr').append(
                $('td').append(item.email ? $('a').text(item.name).href('mailto:'+item.email) : item.name),
                $('td').text(item.role || item.jobTitle),
                $('td').append(item.website ? $('a').text(item.companyName).href(item.website) : item.companyName),
              ))
            ),
          ),
          $('h2').text('Afkortingen'),
          $('table').append(
            $('thead').append(
              $('tr').append(
                $('th').text('Afk.'),
                $('th').text('Omschrijving'),
              )
            ),
            $('tbody').append(
              abbreviations.sort((a,b)=>a.name.localeCompare(b.name)).map(abbreviation => $('tr').append(
                $('td').text(abbreviation.name),
                $('td').text(abbreviation.title),
              ))
            ),
          ),
          $('h2').text('Versies'),
          $('table').append(
            $('thead').append(
              $('tr').append(
                $('th').text('Versie'),
                $('th').text('Omschrijving'),
                $('th').text('Vrijgave'),
              )
            ),
            $('tbody').append(
              versions.map(version => $('tr').append(
                $('td').text(version.nr),
                $('td').text(version.description),
                $('td').text(version.release),
              ))
            ),
          ),

          $('h2').text('Tag aanduidingen'),
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

          $('h1').text('Functies'),
          definitions.oxycontrol.fbs.map(item => [
            $('h2').text(item.title || item.name),
            description(item),

            Object.entries(item.properties||{}).filter(([name,property]) => property.type === 'integer' && property.options).map(([name,property]) => [
              $('h3').text(property.title || name),
              $('table').class('properties').append(
                $('thead').append(
                  $('tr').append(
                    $('th').text('Id').style('min-width:10mm;'),
                    $('th').text('Description').style('width:100%;'),
                  ),
                ),
                $('tbody').append(
                  property.options.map((item,i) => $('tr').append(
                    $('td').text(i),
                    $('td').append(item.title || item.name || item.value || i),
                  )),
                ),
              ),
              property.options.map((item,i) => [
                $('h4').text('Option '+i+': '+item.title || item.name || item.value),
                description(item),
              ]),
            ]),

            $('h3').text('Properties'),
            $('table').class('properties').append(
              $('thead').append(
                $('tr').append(
                  $('th').text('Description').style('width:100%;'),
                  $('th').text('Definition').style('min-width:5cm;'),
                ),
              ),
              $('tbody').append(
                Object.entries(item.properties||{}).map(([name,property]) => $('tr').append(
                  $('td').append(
                    $('div').class('tags').append(
                      (property.visibility||'').split(',').map(tag => $('i').class(tag)),
                    ),
                    $('div').text(property.name || property.title || name),
                    $('div').text(property.description),
                    $('div').text(property.remark),
                  ),
                  $('td').append(Property(property).definition()),
                )),
              ),
            ),

            // (item.options||[]).map(item => [
            //   $('h3').text(item.title || item.name),
            //   item.src ? $('img').class('image-part').src(item.src) : null,
            //   $('p').class('description').text(item.description),
            // ]),
          ]),

          $('h2').text('Overview'),
          $('div').append(
            $('img').src(sbs.overview.src).style('float:right;max-width:50%;'),
            $('ol').append(
              sbs.overview.components.map(item => $('li').text(item.name)),
            ),
          ),
          // $('h1').text('Component list'),
          // product.partslist.map(item => [
          //   $('h2').text(item.title || item.name),
          //   description(item),
          // ]),

          // $('h1').text('Functies'),
          // product.fbs.map(item => [
          //   $('h2').text(item.name),
          //   $('ul').append(
          //     (Array.isArray(item.description) ? item.description : [item.description]).map(line => $('li').append(
          //       typeof line === 'object'
          //       ? $('span').html(Array.from(Object.entries(line||{})).map(([name,value])=>`${name}: ${value}`).join('<br>'))
          //       : line
          //     )),
          //   )
          // ]),
          // $('h1').text('Error list'),
          // $('table').append(
          //   $('thead').append(
          //     $('tr').append(
          //       $('th').text('#').style('min-width:30px;'),
          //       $('th').text('AM').style('min-width:30px;'),
          //       $('th').text('IC').style('min-width:30px;'),
          //       $('th').text('Type').style('min-width:20px;'),
          //       $('th').text('Omschrijving').style('width:100%;'),
          //     ),
          //   ),
          //   $('tbody').append(
          //     product.errorlist.map((error,i) => $('tr').append(
          //       $('td').text(i),
          //       $('td').text(error.errorNumberIntrcooll),
          //       $('td').text(error.errorNumber),
          //       $('td').text(error.type),
          //       $('td').append(
          //         $('div').text(error.title),
          //         $('div').text('Name:', error.name),
          //         $('div').text('Where:', error.where),
          //         $('div').text('When:', error.when),
          //         $('div').text('Solve:', error.solution),
          //       ),
          //     ))
          //   ),
          // ),


          $('h1').text('Examples'),
          product.examples.map((example,i) => [
            // $('h2').text(`Example: `+example.list.map(item => partslist.filter(part => part.name === item.name)).flat().map(part => part.title || part.name).join(', ')),
            $('h2').text(`Example ${i}`),
            buildSetup(example),
          ]),
          // $('li').append(
          //   $('a').text(`Example ${i}: `+example.list.map(item => partslist.filter(part => part.name === item.name)).flat().map(part => part.title || part.name).join(', ')).on('click', e => {
          //     $('.listview').loadPage().then(elem => elem.append(
          //       $('nav').append($('button').class('icn-back').on('click', homepage)),
          //       $('h1').text('Inleiding'),
          //       buildSetup(example),
          //     ))
          //   })
          // )),



          Elems.modebusFunctionCodes(),
          $('h1').text('OxyControl'),
          $('h2').text('Historical Data'),
          propTable(propertiesArr.filter(property => property.his)),
          // $('table').class('grid').append(
          //   $('thead').append(
          //     $('tr').append(
          //       $('th').text('Description').style('width:100%;'),
          //       $('th').text('Definition').style('min-width:5cm;'),
          //     ),
          //   ),
          //   $('tbody').append(
          //     propertiesArr.filter(property => property.his).map((property,i) => $('tr').append(
          //       $('td').append(propertyDescription(property)),
          //       $('td').append(propertyDefinition(property)),
          //     ))
          //   ),
          // ),
          propertiesArr.map(property => property.legend).unique().map(legend => {
            const legendProperties = propertiesArr.filter(property => property.legend === legend);
            // console.log(legend,legendProperties[0]);
            // const {legendDescription,src} = legendProperties[0];
            const propertiesList = [
              {
                title: 'Purchase Order properties',
                properties: legendProperties.filter(property => property.visibility && property.visibility.split(',').includes('po')),
              }, {
                title: 'Configuration properties',
                properties: legendProperties.filter(property => property.visibility && property.visibility.split(',').includes('config')),
              }, {
                title: 'HMI properties',
                properties: legendProperties.filter(property => property.visibility && property.visibility.split(',').includes('hmi')),
              }, {
                title: 'Modbus properties',
                properties: legendProperties.filter(property => property.visibility && property.visibility.split(',').includes('modbus')),
                modbus: true,
              },
            ];
            // console.log(legend,Object.values(propertiesList).some(rows => rows.length));
            if (propertiesList.some(list => list.properties.length)) {
              return [
                $('h2').append(
                  legend,
                  legendProperties[0].version ? $('sup').class('version').text(legendProperties[0].version) : null,
                ),
                Property(legendProperties[0]).legend(),
                propertiesList.map(list=>{
                  const {title,properties,modbus} = list;
                  // console.log(title,properties);
                  if (properties.length) return [
                    $('h3').text(title),
                    modbus ? $('table').class('grid').append(
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
                          $('td').text(functioncode(property.fc,property)),
                          $('td').text(property.register),
                          $('td').append(Property(property).description()),
                          $('td').append(Property(property).definition()),
                        ))
                      ),
                    ) : $('table').class('grid').append(
                      $('thead').append(
                        $('tr').append(
                          $('th').text('Description').style('width:100%;'),
                          $('th').text('Definition').style('min-width:5cm;'),
                        ),
                      ),
                      $('tbody').append(
                        properties.map(property => $('tr').append(
                          $('td').append(Property(property).description()),
                          $('td').append(Property(property).definition()),
                        ))
                      ),
                    )
                  ]
                }),
              ].flat(3);
            }
          }),

          $('h2').text('Modbus list'),
          modbusTables([
            modbusProperties.filter(property => property.type === 'boolean' && !property.readOnly),
            modbusProperties.filter(property => property.type === 'boolean' && property.readOnly),
            modbusProperties.filter(property => property.type === 'integer' && !property.readOnly),
            modbusProperties.filter(property => property.type === 'integer' && property.readOnly),
          ]),
          $('h1').text('OxyRio'),
          $('h2').text('Modbus list'),
          propTable(assignModbus(modbusReadProperties('oxyrio'))),
          $('h1').text('Thermostat'),
          $('h2').text('Modbus list'),
          propTable(modbusReadProperties('thermostat')),
          $('h1').text('OxyConnect'),
          $('h2').text('Modbus list'),
          $('p').text('De volgende modbus variabelen zijn vanaf versie 4 via Modbus TCP beschikbaar voor OxyConnect'),
          propTable(modbusProperties.filter(property => property.oxyconnect)),

          $('h1').text('Testplan'),


          // $('h2').text('Modbus list deprecated'),
          // $('p').text('De volgende modbus variabelen zijn vanaf versie 4 niet meer beschikbaar'),
          // propTable(propertiesArr.filter(property => !property.public && property.oxyconnect)),


        );
        const images = Array.from(elem.el.querySelectorAll('img[src]')).filter(el => !el.complete);
        // console.log(images)
        var loadCount = 0;
        if (images.length) {
          images.forEach(el => el.addEventListener('load', event => images.length == ++loadCount ? setTimeout(e => elem.indexto('aside.right')) : 0));
        } else {
          setTimeout(e => elem.indexto('aside.right'));
        }
      });//print();
    }
    // function softwaredoc(){
    //   $('div').append(
    //     $('link').rel('stylesheet').href('https://aliconnect.nl/sdk-1.0.0/lib/aim/css/print.css'),
    //     $('h1').text('Modbus'),
    //   ).print();
    // }
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
    const Elems = {
      doc() {
        return $('div').style('margin:auto;max-width:18cm;').parent($(document.body).clear()).append(
          $('link').rel('stylesheet').href('https://aliconnect.nl/sdk-1.0.0/lib/aim/css/print.css'),
          $('link').rel('stylesheet').href('https://aliconnect.nl/oxycom/oxycom.github.io/assets/css/print.css'),
        );
      },
      modebusFunctionCodes() {
        return [
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
        ];
      },
    }
    function assignModbus(modbusProperties){
      modbusProperties.filter(property => property.type === 'boolean' && !property.readOnly).forEach((property,register) => Object.assign(property,{fc:1, register}))
      modbusProperties.filter(property => property.type === 'boolean' && property.readOnly).forEach((property,register) => Object.assign(property,{fc:2, register}))
      modbusProperties.filter(property => property.type === 'integer' && !property.readOnly).forEach((property,register) => Object.assign(property,{fc:3, register}))
      modbusProperties.filter(property => property.type === 'integer' && property.readOnly).forEach((property,register) => Object.assign(property,{fc:4, register}))
      return modbusProperties;
    }
    return docbuild();

    (function homepage(){
      $('.listview').clear().append(
        $('div').style('flex:1 0 0;display:flex;flex-direction:column;').append(
          // $('h1').text('Examples'),
          // builder.examples.map((example,i) => $('li').append(
          //   $('a').text(`Example ${i}: `+example.list.map(item => partslist.filter(part => part.name === item.name)).flat().map(part => part.title || part.name).join(', ')).on('click', e => {
          //     $('.listview').loadPage().then(elem => elem.append(
          //       $('nav').append($('button').class('icn-back').on('click', homepage)),
          //       $('h1').text('Inleiding'),
          //       buildSetup(example),
          //     ))
          //   })
          // )),
          // $('div').class('builder').append(
          //   builder.examples.map(buildSetup),
          //   // buildSetup(builder.example2),
          //   // $('div').style('width:1600px;height:1200px;display:inline-block;border:solid 1px red;').append(
          //   //   $('div').style('position:absolute;left:400px;').append(
          //   //     $('img').style('position:absolute;').src('https://aliconnect.nl/oxycom/oxycom.github.io/assets/image/sbs/ic.png'),
          //   //     $('img').style('position:absolute;left:250px;top:60px;width:220px;').src('https://aliconnect.nl/oxycom/oxycom.github.io/assets/image/sbs/ic-filter-1-g4.png'),
          //   //     $('img').style('position:absolute;left:250px;top:60px;width:240px;').src('https://aliconnect.nl/oxycom/oxycom.github.io/assets/image/sbs/ic-filter-3-f7.png'),
          //   //   ),
          //   // ),
          // ),
          $('div').append(
            $('button').text('Doc OxyControl V4').on('click', docbuild),
          ),
          $('details').open(true).append(
            $('summary').text('Configurator'),
            $('p').text('Configureer uw eerste unit en pas dan het aantal aan. De configuratie wordt overgenomen.'),
            $('form').class('config').append(
              $('nav').append(
                $('button').text('Send quotation').type('button').on('click', quotation),
                $('button').text('Gui').type('button').on('click', event => sim(items)),
                $('button').text('Simulatie').type('button').on('click', event => sim(items,true)),
                // $('button').text('Software').type('button').on('click', softwaredoc),
                // $('button').text('Save').type('button').on('click', save),
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
    })()
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
