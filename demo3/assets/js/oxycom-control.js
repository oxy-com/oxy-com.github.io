Web.on('loaded', async (event) => {
  function output_d(prop) {
    return $('div').append(
      $('span').id(prop.id).class('valve').style('width:300px;').value(0),
      $('span').text(prop.id),
    );

  };
  $(document.body).append(
    $('div').style('display:flex;').append(
      $('div').style('width:300px;display:flex;').append(
        $('img').src('/assets/image/build-2d-int-cool-plus.png').style('width:100%;'),
        $('div').style(`position:absolute;background:yellow;display:inlin-block;width:30px;height:30px;border-radius:30px;bottom:30px;right:0;margin:auto;`).text('LH'),
        $('div').style(`position:absolute;background:yellow;display:inlin-block;width:30px;height:30px;border-radius:30px;bottom:0;right:0;margin:auto;`).text('LM'),
        $('div').id('FAN_1').style(`position:absolute;background:blue;display:inlin-block;width:40px;height:40px;border-radius:40px;bottom:0;right:0;left:0;margin:auto;background:url(/assets/image/air-fan.png);background-size:contain;`).text('LM'),
        $('div').id('FAN_2').style(`position:absolute;background:blue;display:inlin-block;width:40px;height:40px;border-radius:40px;top:0;right:0;left:0;margin:auto;background:url(/assets/image/air-fan.png);background-size:contain;`).text('LM'),
      ),
      $('div').append(
        output_d({id:'VALVE_WATER_SUPPLY'}),
        output_d({id:'VALVE_WATER_DRAIN'}),
        $('div').append(
          $('meter').id('TEMP_OUTDOOR_AIR').min(-50).max(50).low(0).style('width:300px;'),
          $('span').text('OUTDOOR'),
        ),
        $('div').append(
          $('meter').id('TEMP_WORK_AIR').min(-50).max(50).low(0).style('width:300px;'),
          $('span').text('WORK'),
        ),
        $('div').append(
          $('meter').id('PRES_1').min(-50).max(50).style('width:300px;'),
          $('span').text('PRES_1'),
        ),
        $('div').append(
          $('meter').id('PRES_2').min(-50).max(50).style('width:300px;'),
          $('span').text('PRES_2'),
        ),
        $('div').append(
          $('meter').id('WATER')
          .min(0)
          .low(2)
          .optimum(2)
          .high(2)
          .max(3)
          .style('width:300px;'),
          $('span').id('WATER_TEXT').text('WATER'),
        ),
      ),
    ),
    $('div').style('display:flex;').append(
      $('div').style('width:300px;display:flex;').append(
        $('img').src('/assets/image/build-2d-natural-ventilator.png').style('width:300px;'),
      ),
      $('div').append(
        $('div').append(
          $('meter').id('EXHAUST_DAMPER').min(0).max(100).style('width:300px;'),
          $('span').text('EXHAUST_DAMPER'),
        ),
      ),
    ),
    $('div').style('display:flex;').append(
      $('div').style('width:300px;display:flex;').append(
        $('img').src('/assets/image/build-2d-hogedruk-ventilator-module.png').style('width:300px;'),
      ),
      $('div').append(
        $('div').append(
          $('meter').id('MIXING_DAMPER').min(0).max(100).style('width:300px;'),
          $('span').text('MIXING_DAMPER'),
        ),
        $('div').append(
          $('meter').id('PRES_3').min(0).max(100).style('width:300px;'),
          $('span').text('PRES_3'),
        ),
        $('div').append(
          $('meter').id('PRES_4').min(0).max(100).style('width:300px;'),
          $('span').text('PRES_4'),
        ),
      ),
    ),
    $('div').style('display:flex;').append(
      $('div').style('width:300px;display:flex;').append(
        $('img').src('/assets/image/build-2d-module-a.png').style('width:300px;'),
      ),
      $('div').append(
      ),
    ),
    $('div').style('display:flex;').append(
      $('div').style('width:300px;display:flex;').append(
        $('img').src('/assets/image/build-2d-module-b.png').style('width:300px;'),
      ),
      $('div').append(
      ),
    ),
    $('div').style('display:flex;').append(
      $('div').style('width:300px;display:flex;').append(
        $('img').src('/assets/image/build-2d-inblaas-plenums-1.png').style('width:300px;'),
      ),
      $('div').append(
        $('div').append(
          $('meter').id('TEMP_SUPPLY_AIR').min(-50).max(50).low(0).style('width:300px;'),
          $('span').text('TEMP_SUPPLY_AIR'),
        ),
      ),
    ),
  );

  const fan1 = $('#FAN_1').el.animate([{ transform: 'rotate(360deg)' },], { duration: 500, iterations: Infinity});
  fan1.updatePlaybackRate(0);
  const fan2 = $('#FAN_2').el.animate([{ transform: 'rotate(360deg)' },], { duration: 500, iterations: Infinity});
  fan2.updatePlaybackRate(0);

  function onchange(event){
    if (event) {
      $(event.target).value(event.target.value);
    }
    $('meter#WATER').value($('input#WATER').el.value);
    $('meter#TEMP_SUPPLY_AIR').value($('input#TEMP_SUPPLY_AIR').el.value);
    $('meter#TEMP_WORK_AIR').value($('input#TEMP_WORK_AIR').el.value);
    $('meter#TEMP_OUTDOOR_AIR').value($('input#TEMP_OUTDOOR_AIR').el.value);


    if (Number($('input#WATER').el.value)<2) {
      $('SPAN#VALVE_WATER_SUPPLY').value(1);
      $('SPAN#VALVE_WATER_DRAIN').value(0);
    }
    if (Number($('input#WATER').el.value)>2) {
      $('SPAN#VALVE_WATER_SUPPLY').value(0);
      $('SPAN#VALVE_WATER_DRAIN').value(0);
    }

    if (Number($('input#WATER').el.value)>2) {
      $('SPAN#VALVE_WATER_SUPPLY').value(0);
      $('SPAN#VALVE_WATER_DRAIN').value(0);
    }
    var fan1_speed = 100 - (50 - Number($('input#TEMP_SUPPLY_AIR').el.value));
    var fan2_speed = fan1_speed;

    $('#FAN_1_SPEED').value(fan1_speed);
    $('#FAN_2_SPEED').value(fan2_speed);

    fan1.updatePlaybackRate($('#FAN_1_SPEED').el.getAttribute('value')/100);
    fan2.updatePlaybackRate($('#FAN_2_SPEED').el.getAttribute('value')/100);

  }
  const properties = [
    {id: 'TEMP_SET',type: 'range',min: -50,max: 50,value: 20 },

    {id: 'WATER',type: 'range',min: 0,max: 3, value: 0 },


    {id: 'TEMP_OUTDOOR_AIR',type: 'range',min: -50,max: 50,value: 20 },
    {id: 'TEMP_WORK_AIR',type: 'range',min: -50,max: 50,value: 20 },
    {id: 'TEMP_SUPPLY_AIR',type: 'range',min: -50,max: 50,value: 20 },

    {id: 'FAN_1_SPEED',type: 'range',min: 0,max: 100,value: 0 },
    {id: 'FAN_2_SPEED',type: 'range',min: 0,max: 100,value: 0 },
  ];
  properties.forEach(prop => {
    const elem = $('div').parent(document.body).append(
      $('input').id(prop.id).type(prop.type).style('width:300px;').min(prop.min).max(prop.max).value(prop.value).on('change', onchange),
      $('span').text(prop.id),
    );
  });
  onchange();
});
