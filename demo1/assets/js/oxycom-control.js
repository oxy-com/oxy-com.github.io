// Web.init({
//   authRoot: 'https://oauth.aliconnect.nl/v1',
//   socketRoot: 'https://aliconnect.nl:444',
//   serviceRoot: 'https://aliconnect.nl/v1',
// }).on('loaded', async function () {
Web.on('loaded', async (event) => {
  config = {
    sensor: {
      tempCond1: {
        input: {
          temp: {

          },
          cond: {

          },
        },

      },
    },
    actors: {

    },
    units: [
      {},
      {},
      {},
    ],
    unitAttributes: [
      { out: 1, class:'vent', name: 'poVent2', title: 'Ventilator 2', type:'range', min:0, max:10, step:0.5, value:0, disabled: true },
      { out: 1, class:'vent', name: 'poVent1', title: 'Ventilator 1', type:'range', min:0, max:10, step:0.5, value:0, disabled: true },

      { out: 1, name: 'aoKlepZijkant', title: 'AO Klep Zijkant', type:'range', min:0, max:10, step:0.5, value:0, disabled: true },
      { out: 1, name: 'aoKlepBoven', title: 'AO Klep Boven', type:'range', min:0, max:10, step:0.5, value:0, disabled: true },
      { out: 1, name: 'aoKlepUitblaas', title: 'AO Klep Uitblaas', type:'range', min:0, max:10, step:0.5, value:0, disabled: true },
      { out: 1, name: 'aoKlepVerwarmen', title: 'AO Klep Verwarmen', type:'range', min:0, max:10, step:0.5, value:0, disabled: true },

      { out: 1, name: 'doAanvoer1', title: 'DO Aanvoer 1', type:'checkbox', disabled: true },
      { out: 1, name: 'doAafvoer1', title: 'DO Afvoer 1', type:'checkbox', disabled: true },
      { out: 1, class:'pomp', name: 'doPomp1', title: 'DO Pomp 1', type:'checkbox', disabled: true },

      { out: 1, name: 'doWaterBehandeling', title: 'DO Water behandeling 1', type:'checkbox', disabled: true },
      { out: 1, name: 'doWaterToevoer', title: 'DO Water toevoer 1', type:'checkbox', disabled: true },

      { out: 1, name: 'doAlarmActief', title: 'DO Alarm actief', type:'checkbox', disabled: true },
      // { name: 'alarmText', title: 'Alarmen', disabled: true },

      { name: 'diHand', title: 'DI Hand', type:'checkbox' },

      { name: 'diWaterLaag', title: 'DI Water Laag', type:'checkbox', checked:1 },
      { name: 'diWaterMidden', title: 'DI Water Midden', type:'checkbox' },
      { name: 'diWaterHoog', title: 'DI Water Hoog', type:'checkbox' },
      { name: 'aiWaterFlow1', title: 'AI Waterflow', type:'number', min:0, max:10, step:0.5 },

      { name: 'mbCond1', title: 'Cond In 1', type:'number', min:0, max:10, step:0.5, value:3 },
      { name: 'mbcond1Temp', title: 'Cond Temp In 1', type:'number', min:0, max:10, step:0.5, value:5 },

      { name: 'aiTemp1', title: 'AI Temp 1', type:'number', min:-50, max:50, step:0.5, value:23 },
      { name: 'aiTemp2', title: 'AI Temp 2', type:'number', min:-50, max:50, step:0.5 },
      { name: 'aiTemp3', title: 'AI Temp 3', type:'number', min:-50, max:50, step:0.5 },
      { name: 'aiTemp4', title: 'AI Temp 4', type:'number', min:-50, max:50, step:0.5 },

      { name: 'aiStuur1', title: 'AI Stuur', type:'number', min:0, max:10, step:0.5 },

      { name: 'aiPres1', title: 'AI Pres 1', type:'number', min:0, max:10, step:0.5, value:5 },
      { name: 'aiPres2', title: 'AI Pres 2', type:'number', min:0, max:10, step:0.5, value:5 },

    ],
  }

  $(document.body).append(
    $('form').append(
      $('main').append(
        $('div').append(
          $('label').text('Temp ingesteld'),
          $('input').name('tempRoomDisplaySet').type('number').style('width:80px;').step(0.5).value(20),
          $('input').name('tempRoomDisplay').type('number').style('width:80px;').step(0.5).disabled(true),
          $('input').name('inTempRoom1').type('number').style('width:80px;').min(-50).max(50).step(0.5).value(23),
        ),
        $('table').append(
          $('tbody').append(
            config.unitAttributes.filter(attr => attr.out).map(attr => $('tr').append(
              $('td').text(attr.title),
              config.units.map((unit,i) => $('td').append(
                $('input').attr(attr).name(`${attr.name}_${i}`),
                $('label'),
              )),
            )),
          ),
        ),
        $('div').style('overflow:overlay;').append(
          $('div').class('alerts').style('background:red;color:black;'),
          $('div').class('warns').style('background:orange;color:black;'),
          $('div').class('info').style('color:orange;'),
        ),
      ),
      $('div').append(
        $('table').append(
          $('tbody').append(
            config.unitAttributes.filter(attr => !attr.out).map(attr => $('tr').append(
              $('td').text(attr.title),
              config.units.map((unit,i) => $('td').append(
                $('input').attr(attr).name(`${attr.name}_${i}`),
                $('label'),
              )),
            )),
          ),
        ),
      ),
    ).on('change', function (event) {
      const maxCondLevel = 5;
      const presHigh = 6;
      const presLow = 4;

      const alerts = [];
      const warns = [];
      const info = [];
      const {value} = event.target;
      $(event.target).attr({value});


      const form = this;
      form.tempRoomDisplay.value = form.inTempRoom1.value;//Math.round(tempSensors.reduce((t,v) => t+v,0) / tempSensors.length * 10) / 10;

      config.units.forEach((unit,i) => {
        const unitAlerts = [];
        function prop(name){
          return form[`${name}_${i}`];
        }
        function setValue(name, value){
          const el = form[`${name}_${i}`];
          // Math.max(0,
          return el.setAttribute('value', el.value = Math.min(el.max, Math.max(el.min, Math.round(value*10)/10)));
        }
        const tempSensors = [
          form.inTempRoom1.value,
          prop('aiTemp1').value,
          prop('aiTemp2').value,
          prop('aiTemp3').value,
          prop('aiTemp4').value,
        ].map(Number).filter(Boolean);

        const temp = Math.round(tempSensors.reduce((t,v) => t+v,0) / tempSensors.length * 10) / 10;
        const tempDiff = temp - form.tempRoomDisplaySet.value;

        setValue('poVent1',tempDiff * 1.5);
        setValue('poVent2',tempDiff * 1.5);
        setValue('aoKlepVerwarmen', -tempDiff * 1.5);

        if (unit.step === 'leegpompen') {
          info.push(`Unit ${i+1} leegpompen`);
          prop('doAanvoer1').checked = false;
          prop('doAafvoer1').checked = true;
          if (!prop('diWaterLaag').checked && prop('mbCond1').value < maxCondLevel) {
            unit.step = '';
            prop('doAafvoer1').checked = false;
            prop('doAanvoer1').checked = true;
            prop('doPomp1').checked = true;
          }
        } else if (prop('mbCond1').value >= maxCondLevel) {
          unit.step = 'leegpompen';
        } else if (!prop('diWaterLaag').checked) {
          prop('doAanvoer1').checked = true;
          prop('doPomp1').checked = true;
        } else if (prop('diWaterMidden').checked) {
          prop('doAanvoer1').checked = false;
          prop('doPomp1').checked = false;
        }

        if (!prop('doAanvoer1').checked && prop('aiWaterFlow1').value > 0) warns.push(`Unit ${i+1} waterflow zonder klep open`);
        if (prop('doAanvoer1').checked && prop('aiWaterFlow1').value < 1) warns.push(`Unit ${i+1} aanvoer open, geen waterflow`);

        if (prop('aiPres1').value < presLow) unitAlerts.push(`Unit ${i+1} Presure-1 low`);
        if (prop('aiPres1').value > presHigh) unitAlerts.push(`Unit ${i+1} Presure-1 high`);
        if (prop('aiPres2').value < presLow) unitAlerts.push(`Unit ${i+1} Presure-2 low`);
        if (prop('aiPres2').value > presHigh) unitAlerts.push(`Unit ${i+1} Presure-2 high`);

        if (prop('diWaterMidden').checked && !prop('diWaterLaag').checked) unitAlerts.push(`Unit ${i+1} Fout sensor WaterLaag of WaterMidden`);
        else if (prop('diWaterHoog').checked && !prop('diWaterLaag').checked) unitAlerts.push(`Unit ${i+1} Fout sensor WaterLaag of WaterHoog`);
        else if (prop('diWaterHoog').checked && !prop('diWaterMidden').checked) unitAlerts.push(`Unit ${i+1} Fout sensor WaterHoog of WaterMidden`);
        else if (prop('diWaterHoog').checked) unitAlerts.push(`Unit ${i+1} WaterHoog`);


        prop('doAlarmActief').checked = unitAlerts.length;
        alerts.push(...unitAlerts);

      })
      $('.alerts').text('').append(alerts.map(msg => $('div').text(msg)));
      $('.warns').text('').append(warns.map(msg => $('div').text(msg)));
      $('.info').text('').append(info.map(msg => $('div').text(msg)));
    })
  )
  $('body>form').emit('change');






});
