

Display Menu 	Value type	Factory setting 	Unit	Description
*To scroll through menu, use left button (1) to go to previous value and right button (2) to go to next value* 				
W01:Model name 	-			Model name and type
W02:SerialNumber	-			Unit serial number
W03:Chip number	-			PCB chip number
W04:OperatingHrs 	Measured value		hh:mm 	Total operating hours: heat-recliam (when available), free-cooling and cooling hours (if software is upgraded, hours before update are not accounted for)
W05:CoolingHours	Measured value		hh:mm 	Total cooling hours (if software is upgraded, hours before update are not accounted for)
W06:OperatingMod	Actual mode			Actual operation mode (see table below)
W07:Outdoor Temp	Measured value		°CDB	Outdoor air dry-bulb temperature  
W08:Outdoor Temp	Calculated value		°CWB	Outdoor air wet-bulb temperature (calculated based on outdoor temperature/outdoor relative humidity/barometric pressure)
W09:Outdoor RH	Calculated value		%	Outdoor relative humidity (calculated based on outdoor temperature and absolute humidity)
W10:Air Pressure	Measured value		mBar	Measured barometric pressure
W11:Supply Temp	Measured value	Niet aangesloten	°CDB	Measured IntrCooll supply temperature
W12:PowerConsump	Measured value		Watt	Measured actual power consumption (if optional energy meter is selected)
W13:Amperage	Measured value		Amps	Measured actual amperage (if optional energy meter is selected)
W14:Voltage	Measured value		Volt	Measured actual voltage (if optional energy meter is selected)
W15:PressureLoss	Measured value		Pa	Differential pressure over Oxyvap/Filter/Coil (filter fouling can be derived from this value)
W16: Water flow	Measured value		liters/min	Actual supply water flow (indication)
W17:Water level	Measured value			Actual water level in tank
W18:Conductivity	Measured value		µS/cm	Actual water conductivity in tank
W19:Water Temp	Measured value		°C	Actual water temperature in tank
W20:WaterConsump	Measured value		liters and m³	Total water consumption (if software is upgraded, hours before update are not accounted for)
W21:CoolingRelease	Parameter			Minimum outdoor temperature for cooling mode (if there is cooling demand below this temperature, system will switch to free-cooling)
W22:W-SupplyValv	Status 			Status of water supply solenoid
W23:W-DrainValv	Status 			Status of water drain valve
W24:W-FrostValve	Status 			Status of freeze protection valve (if used)
W25:W-Pump	Status 			Status of water recirculation pump
W26:W-Disinfecti	Status 			Status of water disinfection (various options)
W27:A-ExhaustAir	Output			Output value for building exhaust output (optional damper, fan or Natural Ventilator box) (0 … 100% = 0 … 10V)
W27:A-OutdoorAir	Output			Output value for outdoor air/ventilation output (optional damper) (0 … 100% = 0 … 10V) (0% = closed / recirculation … 100% = 100% fresh air)
W29:A-AirOptimiz	Output			Output value for AirOptimizer (optional) exhaust output (damper or fan) (0 … 100% = 0 … 10V) ( 0% = heating 'vertical' …  100% = cooling 'horizontal')
W30:A-Heating	Output			Output value for required heating capacity (external heat source) (0 … 100% = 0 … 10V)
W31:Error codes	Status 			Active errors  (01 = only error code 01 and  01,03,06 = error codes 1, 3 and 6)
W32:Time	- 		hh:mm:ss	Local time derived from thermostat


Settings Menu	Value type	Factory setting 	Unit	Description
*To open this menu, push both buttons (1 and 2) below display shortly (1sec) and release both buttons at the same time*				
**Use left button (1) to change selected parameter/settting, use right button (2) to go to next parameter/settings (it is not possible to go through previous settting, scroll entire menu)**  				
S01:Filter type	Setting	- 		Select used filter medium
S02:LevelSensL	Setting	10		Don't change this parameter (PCB rev. B requires higher setting, e.g. 100)
S03:LevelSensH	Setting	10		Don't change this parameter (PCB rev. B requires higher setting, e.g. 100)
S04:Drain delay	Setting	60	minutes 	Delay for draining the tank completely after cooling.
S05:DrainDuration	Setting	90	seconds	Short drain duration (during operation when conductivity exceeds limit), can be set.
S06:MaxConductiv	Setting	1500	µS/cm	Conductivity limit for recirculation water (maximum is 1500µS/cm and/or 10 cycles of concentration - above this value calcium will deposit at increased rates)
S07:OverflowProt	Setting	15	seconds	Overflow protection timer (opening time of drain valve when level high is reached).
S08:Rinse	Setting	10	seconds	Flush duration after draining (opening time of supply solenoid).
S09:HeatReclaim	Setting	Off		Enable of disable HeatReclaim (heating) mode (Enable when Heat Reclaim or 4S module is used for this unit)
S10:OperationMod	Setting	Automatic 		Manually select operation mode for maintenance (saving settings required to activate / do not forget to switch back to automatic and save again)
S11:Fan speed	Setting	Automatic 		Manually select fan speed for maintenance (saving settings required to activate / do not forget to switch back to automatic and save again)
S12:MinFanHeatin	Setting	40	%	Minimum fan speed for Heat Reclaim (only change when approved by Oxycom or representative!)
S13:MaxFanHeatin	Setting	60	%	Maximum fan speed for Heat Reclaim (only change when approved by Oxycom or representative!)
S14:MinFanFreeCo	Setting	5	%	Minimum fan speed for free-cooling  (only change when approved by Oxycom or representative!)
S15:MaxFanFreeCo	Setting	80	%	Maximum fan speed for free-cooling (only change when approved by Oxycom or representative!)
S16:MinFanCoolin	Setting	5	%	Minimum fan speed for cooling (only change when approved by Oxycom or representative!)
S17:MaxFanCoolin	Setting	80	%	Maximum fan speed for cooling (only change when approved by Oxycom or representative!)
S18:CoolingRelea	Setting	15	°C	Minimum outdoor temperature for cooling. If there is cooling demand below this temperature, system will switch to free-cooling.
S19:Thermostat ID	Setting	2		Thermostat Modbus ID (corresponding thermostat)
S20:Control	Setting	Thermostat		Control type
S21:Modbus Address	Setting	1		Unit modbus ID
S22:ModbusBaudra	Setting	19200		Unit modbus Baudrate
S23:ModbusParity 	Setting	8N1		Unit modbus Parity
S24:Drain Valve	Setting	2-wire N.O.		Configure drain valve type (older units have 3-wire valves, new units have 2-wire valve)
S25:WaterDisinfe	Setting	None		Select water disinfection type (Ozone/UV-C Lamp/ChlorineDioxe generator)
S26:Dig. Input J12 	Setting	Not used		Select function of digital input J12: Not used/AHU pre-cooling/Fire contact
S27:Winter mode	Setting	Off		Enable/disable winter mode - winter mode means free-cooling instead of cooling (default winter period is 15 October till 15 May - can be changed with SettingsTool)
S28:Model	Setting	-		Set model type
S29:Serialnumber	Setting	-		Set serial number
S30:Language	Setting	English		Set display menu language
S31:FactorySetti	Setting			Load factory settings (saving settings required to activate)
***To leave settings menu, push both buttons (1 and 2) below display shortly (1sec) and release both buttons at the same time. Choose if you want to save the new settings (Button 1=Yes  / Button 2=No)***  				


Error codes	Error types: A = System locked / B = Maintenance required			
01	01(A): Tank fill takes to long; check water pressure or replace supply/drain valve (Port: 20/21)			
02	02(A): Measured flow while supply valve was closed; check or replace supply valve (Port: 20)			
03	03(B): Tank drain takes to long; clean drain pipe (clogged) or replace drain valve (Port: 21)			
04	04(B): Filter pressure exceeded; clean or replace filters			
05	05(B): Level sensor shows deviating value; clean or replace level sensor(s) (Port: 5)			
06	06(B): Conductivity sensor shows deviating value; clean or replace sensor (Port: 15)			
07	07(A): Outdoor temperature sensor shows deviating value; check or replace sensor (Port: 1)			
08	08(B): Supply temperature sensor shows deviating value; check or replace sensor (Port: 3)			
09	09(B): No connection with thermostat or network (Modbus); check cables and parameters (Port: 16) 			
10	10(A): Error supply fan; check cables and fan (Port: 13)			
11	11(A): Error exhaust fan; check cables and fan (Port: 14).			
12	12(B): Cooling performance below minimum value; check recirculation pump (Port: 18) and water distribution. 			
13	13(A): System error 			
*Error codes discriptions can be found in electronics compartment* 				
**To reset/remove errors, push "reset" button directly below display (left side)**				


Operation mode	Description			
Heat reclaim	Unit is in heating mode (only when Heat Recliam is activated)			
Free cooling 	Unit is in free cooling mode (cooling with outdoor air - w/o water)			
Standby	Stand-by			
Tank fill	Unit is filling the water tank			
Pre-wet	Unit is soaking the evaporative media (fans at low speed) 			
Cooling	Unit is in cooling mode			
OverflowProt	Drain valve open (short) to prevent tank overflow			
Drain	Unit is draining the tank 			
Rinse	Unit rinses/flushes the tank 			
Hygiene dry-out	Unit is in hygiene dry-out mode 			
System locked	Unit is locked (Error type A active)			




# Actuators

FAN1_PWM_PIN_INDEX          0
FAN2_PWM_PIN_INDEX          1
FAN1_ALARM_PIN_INDEX        2
FAN2_ALARM_PIN_INDEX        3
<!-- PCB_FAN_PIN_INDEX           4 -->


DIG_OUT_1_PIN_INDEX     0
DIG_OUT_2_PIN_INDEX     1
DIG_OUT_3_PIN_INDEX     2
DIG_OUT_4_PIN_INDEX     3
DIG_OUT_5_PIN_INDEX     4
DIG_OUT_RELAY_INDEX     5
DIG_OUT_IN_1_INDEX      6
PCB_FAN_PIN_INDEX       7


V0_10_LDAC_PIN_INDEX     0
V0_10_BSY_PIN_INDEX     1


# Sensors

#define DIG_IN_1_PIN_INDEX          0
#define DIG_IN_2_PIN_INDEX          1
#define FAN_ALARM_1_PIN_INDEX       2
#define FAN_ALARM_2_PIN_INDEX       3

#define SENSOR_INPUT_1  SENSOR_WATER

#define AVG_COUNT_OUTDOOR_TEMP        60
#define AVG_COUNT_ROOM_TEMP           60
#define AVG_COUNT_SUP_AIR_TEMP        60
#define AVG_COUNT_WORK_AIR_TEMP       60

#define AVG_COUNT_WATER_LEVEL_LOW     3
#define AVG_COUNT_WATER_LEVEL_HIGH    3

#define AVG_COUNT_RHTEMP_TEMP        60
#define AVG_COUNT_RHTEMP_RH          60
#define AVG_COUNT_BAR_BAR            60
#define AVG_COUNT_DIFF_PRESS         60

#define AVG_COUNT_WATER_CONSUMPTION_MIN   30 // 30x 2 sec = 60 sec AVG
#define AVG_COUNT_WATER_CONSUMPTION_HOUR  600 // 600x 6 sec = 1 hour AVG




# Pins

/** List of all SDRAM pin definitions. */
#define PIN_SDRAM_D0_7                  {0x000000FF, PIOC, ID_PIOC, PIO_PERIPH_A, PIO_DEFAULT}
#define PIN_SDRAM_D8_13                 {0x0000003F, PIOE, ID_PIOE, PIO_PERIPH_A, PIO_DEFAULT}
#define PIN_SDRAM_D14_15                {0x00018000, PIOA, ID_PIOA, PIO_PERIPH_A, PIO_DEFAULT}
#define PIN_SDRAM_A0_9                  {0x3FF00000, PIOC, ID_PIOC, PIO_PERIPH_A, PIO_DEFAULT}
#define PIN_SDRAM_SDA10                 {0x00002000, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
//#define PIN_SDRAM_A11                   {0x80000000, PIOC, ID_PIOC, PIO_PERIPH_A, PIO_DEFAULT}

#define PIN_SDRAM_CAS                   {0x00020000, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define PIN_SDRAM_RAS                   {0x00010000, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define PIN_SDRAM_SDCKE                 {0x00004000, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define PIN_SDRAM_SDCK                  {0x00800000, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define PIN_SDRAM_SDSC                  {0x00008000, PIOC, ID_PIOC, PIO_PERIPH_A, PIO_DEFAULT}
#define PIN_SDRAM_NBS0                  {0x00040000, PIOC, ID_PIOC, PIO_PERIPH_A, PIO_DEFAULT}
#define PIN_SDRAM_NBS1                  {0x00008000, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define PIN_SDRAM_SDWE                  {0x20000000, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define PIN_SDRAM_BA0                   {0x00100000, PIOA, ID_PIOA, PIO_PERIPH_C, PIO_DEFAULT}

#define BOARD_SDRAM_PINS                PIN_SDRAM_D0_7, PIN_SDRAM_D8_13 , PIN_SDRAM_D14_15,\
                                        PIN_SDRAM_A0_9, PIN_SDRAM_SDA10, PIN_SDRAM_BA0, \
                                        PIN_SDRAM_CAS, PIN_SDRAM_RAS, PIN_SDRAM_SDCKE,PIN_SDRAM_SDCK,\
                                        PIN_SDRAM_SDSC,PIN_SDRAM_NBS0 ,PIN_SDRAM_NBS1,PIN_SDRAM_SDWE

/** Board pin definitions */
#define DISPLAY_PIN_RS                  {PIO_PC8, PIOC, ID_PIOC, PIO_OUTPUT_1, PIO_DEFAULT}
#define DISPLAY_PIN_RW                  {PIO_PC9, PIOC, ID_PIOC, PIO_OUTPUT_1, PIO_DEFAULT}
#define DISPLAY_PIN_EN                  {PIO_PC10, PIOC, ID_PIOC, PIO_OUTPUT_1, PIO_DEFAULT}
#define DISPLAY_PINS_DATAI_4            {PIO_PA0, PIOA, ID_PIOA, PIO_INPUT, PIO_PULLUP | PIO_DEBOUNCE | PIO_DEGLITCH}
#define DISPLAY_PINS_DATAI_5            {PIO_PA1, PIOA, ID_PIOA, PIO_INPUT, PIO_PULLUP | PIO_DEBOUNCE | PIO_DEGLITCH}
#define DISPLAY_PINS_DATAI_6            {PIO_PA2, PIOA, ID_PIOA, PIO_INPUT, PIO_PULLUP | PIO_DEBOUNCE | PIO_DEGLITCH}
#define DISPLAY_PINS_DATAI_7            {PIO_PA5, PIOA, ID_PIOA, PIO_INPUT, PIO_PULLUP | PIO_DEBOUNCE | PIO_DEGLITCH}
#define DISPLAY_PIN_BACKLIGHT           {PIO_PC11, PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}

/* ACTUATORS PIN DEFINITIONS */

// FANs
#define FAN1_PWM_PIN                   {PIO_PC0, PIOC, ID_PIOC, PIO_PERIPH_B, PIO_DEFAULT}
#define FAN2_PWM_PIN                   {PIO_PC1, PIOC, ID_PIOC, PIO_PERIPH_B, PIO_DEFAULT}
#define FAN1_ALARM_PIN                 {PIO_PC30, PIOC, ID_PIOC, PIO_INPUT, PIO_DEFAULT}
#define FAN2_ALARM_PIN                 {PIO_PA8, PIOA, ID_PIOA, PIO_INPUT, PIO_DEFAULT}

// Dig.Out
#define DIG_OUT_1_PIN                  {PIO_PC14, PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}
#define DIG_OUT_2_PIN                  {PIO_PC16, PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}
#define DIG_OUT_3_PIN                  {PIO_PC17, PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}
#define DIG_OUT_4_PIN                  {PIO_PC18, PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}
#define DIG_OUT_5_PIN                  {PIO_PC19, PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}
#define DIG_OUT_RELAY_PIN              {PIO_PC20, PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}
#define DIG_OUT_IN_1                   {PIO_PC21, PIOC, ID_PIOC, PIO_OUTPUT_1, PIO_DEFAULT}

// Rev.C detection pin (When pin is low, board is rev.C)
#define DIG_BOARD_DET                  {PIO_PC12, PIOC, ID_PIOC, PIO_INPUT, PIO_PULLUP}


// PCB FAN
//#define PCB_FAN_PIN                    {PIO_PC2, PIOC, ID_PIOC, PIO_PERIPH_B, PIO_DEFAULT}
#define PCB_FAN_PIN                    {PIO_PC2, PIOC, ID_PIOC, PIO_OUTPUT_1, PIO_DEFAULT}

// 0-10V Pin
#define V0_10_LDAC_PIN                  {PIO_PA25, PIOA, ID_PIOA, PIO_INPUT, PIO_DEFAULT}
#define V0_10_BSY_PIN                   {PIO_PA26, PIOA, ID_PIOA, PIO_INPUT, PIO_DEFAULT}

// I2C
#define I2C_SDA_1                       {PIO_PD27, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define I2C_SCL_1                       {PIO_PD28, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define I2C_SDA_2                       {PIO_PA3, PIOA, ID_PIOA, PIO_PERIPH_A, PIO_DEFAULT}
#define I2C_SCL_2                       {PIO_PA4, PIOA, ID_PIOA, PIO_PERIPH_A, PIO_DEFAULT}

// I2C general IO pin
#define I2C_PIN_SCL_1                   {PIO_PD28, PIOD, ID_PIOD, PIO_OUTPUT_1, PIO_DEFAULT}
#define I2C_PIN_SCL_2                   {PIO_PA4 , PIOA, ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}

// Analog channel activation and selection
#define CHANNEL_SELECT_A                {PIO_PA19, PIOA, ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define CHANNEL_SELECT_B                {PIO_PA20, PIOA, ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define PT1000_1_ON                     {PIO_PC4,  PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}
#define PT1000_2_ON                     {PIO_PA13, PIOA, ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define PT1000_3_ON                     {PIO_PA23, PIOA, ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define PT1000_4_ON                     {PIO_PA15, PIOA, ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define CONDUCT_OFF                     {PIO_PC5,  PIOC, ID_PIOC, PIO_OUTPUT_1, PIO_DEFAULT}
#define ANA_IN_ON                       {PIO_PC7,  PIOC, ID_PIOC, PIO_OUTPUT_1, PIO_DEFAULT}
#define ANA_IN_SELECT                   {PIO_PA14, PIOA, ID_PIOA, PIO_OUTPUT_1, PIO_DEFAULT}

// Digital In
#define DIG_IN_1_PIN                    {PIO_PC22, PIOC, ID_PIOC, PIO_INPUT, PIO_PULLUP | PIO_IT_FALL_EDGE}
#define DIG_IN_2_PIN                    {PIO_PC23, PIOC, ID_PIOC, PIO_INPUT, PIO_PULLUP | PIO_IT_FALL_EDGE /*| PIO_DEGLITCH | PIO_DEBOUNCE*/ }

// FAN Alarm pin
#define FAN_ALARM_1_PIN                 {PIO_PC30, PIOC, ID_PIOC, PIO_INPUT, PIO_PULLUP}
#define FAN_ALARM_2_PIN                 {PIO_PA8 , PIOA, ID_PIOA, PIO_INPUT, PIO_PULLUP}

// RS485
#define RS485_DIRECTION                 {PIO_PC28, PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT}
#define RS485_RX                        {PIO_PD16, PIOD, ID_PIOD, PIO_PERIPH_B, PIO_DEFAULT}
#define RS485_TX                        {PIO_PD15, PIOD, ID_PIOD, PIO_PERIPH_B, PIO_DEFAULT}

// RS485 Extenal port (MIKROE)
#define RS485_MKB_DIRECTION             {PIO_PC3 , PIOC, ID_PIOC, PIO_OUTPUT_0, PIO_DEFAULT} // MIKROE PWM pin
#define RS485_MKB_RX                    {PIO_PB0 , PIOB, ID_PIOB, PIO_PERIPH_C, PIO_DEFAULT}
#define RS485_MKB_TX                    {PIO_PB1 , PIOB, ID_PIOB, PIO_PERIPH_C, PIO_DEFAULT}

// RS485 isolated port (Port 17 on PCB)
#define RS485_ISO_DIRECTION             {PIO_PA6 , PIOA, ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define RS485_ISO_RX                    {PIO_PD18 , PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}
#define RS485_ISO_TX                    {PIO_PD19 , PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}

// SERIAL
#define SERIAL_RX                       {PIO_PA10, PIOA, ID_PIOA, PIO_PERIPH_A, PIO_DEFAULT}
#define SERIAL_TX                       {PIO_PA9 , PIOA, ID_PIOA, PIO_PERIPH_A, PIO_DEFAULT}

#define MMI_SW_1                        {PIO_PA17, PIOA, ID_PIOA, PIO_INPUT, PIO_PULLUP /*| PIO_IT_FALL_EDGE | PIO_DEGLITCH | PIO_DEBOUNCE */ }
#define MMI_SW_2                        {PIO_PA18, PIOA, ID_PIOA, PIO_INPUT, PIO_PULLUP /*| PIO_IT_FALL_EDGE | PIO_DEGLITCH | PIO_DEBOUNCE */ }

// USB
#define USB_ENABLE                      {PIO_PA29, PIOA, ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define USB_CONNECTED                   {PIO_PB13, PIOB, ID_PIOB, PIO_INPUT, PIO_PULLUP}

// DataFlash
#define DATAFLASH_MISO                  {PIO_PD20B_SPI0_MISO, PIOD, ID_PIOD, PIO_PERIPH_B, PIO_DEFAULT}
#define DATAFLASH_MOSI                  {PIO_PD21B_SPI0_MOSI, PIOD, ID_PIOD, PIO_PERIPH_B, PIO_DEFAULT}
#define DATAFLASH_SCK                   {PIO_PD22B_SPI0_SPCK, PIOD, ID_PIOD, PIO_PERIPH_B, PIO_DEFAULT}
#define DATAFLASH_CS                    {PIO_PD12C_SPI0_NPCS2, PIOD, ID_PIOD, PIO_PERIPH_C, PIO_DEFAULT}

#define BOARD_GMAC_PHY_ADDR             0
#define PIN_GMAC_RESET                  {PIO_PD10, PIOD, ID_PIOD, PIO_OUTPUT_0, PIO_DEFAULT}//{PIO_PD10, PIOD, ID_PIOD, PIO_OUTPUT_1, PIO_DEFAULT}
#define PIN_GMAC_INT                    {PIO_PD11, PIOD, ID_PIOD, PIO_INPUT, PIO_PULLUP | PIO_IT_FALL_EDGE}
#define PIN_GTXCK                       {PIO_PD0A_GTXCK, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}
#define PIN_GTXEN                       {PIO_PD1A_GTXEN, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}
#define PIN_GTX0                        {PIO_PD2A_GTX0, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}
#define PIN_GTX1                        {PIO_PD3A_GTX1, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}
#define PIN_GRXDV                       {PIO_PD4A_GRXDV, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_DEFAULT}
#define PIN_GRX0                        {PIO_PD5A_GRX0, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}
#define PIN_GRX1                        {PIO_PD6A_GRX1, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}
#define PIN_GRXER                       {PIO_PD7A_GRXER, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}
#define PIN_GMDC                        {PIO_PD8A_GMDC, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}
#define PIN_GMDIO                       {PIO_PD9A_GMDIO, PIOD, ID_PIOD, PIO_PERIPH_A, PIO_PULLUP}

#define USB_ENABLE                      {PIO_PA29, PIOA, ID_PIOA, PIO_OUTPUT_0, PIO_DEFAULT}
#define USB_CONNECTED                   {PIO_PB13, PIOB, ID_PIOB, PIO_INPUT, PIO_PULLUP}

#define USART_CONSOLE_RXD               {PIO_PA9A_URXD0, PIOA, ID_PIOA, PIO_PERIPH_A, PIO_DEFAULT}
#define USART_CONSOLE_TXD               {PIO_PA10A_UTXD0, PIOA, ID_PIOA, PIO_PERIPH_A, PIO_DEFAULT}



#define CMD_START_UPGRADE                       0x02
#define CMD_FIRMWAREPAGE                        0x08

#define CMD_READ_WETBULB_EFF                    0x40
#define CMD_READ_WORK_MODE                      0x50
#define CMD_REBOOT                              0x60
#define CMD_READ_SENSORS                        0x0C
#define CMD_GET_ALARMS                          0x1D
#define CMD_RESET_ALARMS                        0x0D
#define CMD_GET_TIME                            0x0E
#define CMD_SET_TIME                            0x0F

#define CMD_READ_SETTINGS                       0x0A
#define CMD_WRITE_SETTINGS_COMPLETE             0x0B
// 05-07-2017 - Settings ares plit into 'settings only', 'ethernet settings' and 'serial number settings'
#define CMD_WRITE_SETTINGS_SETTINGS_ONLY        0x10
#define CMD_WRITE_SETTINGS_ETHERNET             0x20
#define CMD_WRITE_SETTINGS_SERIAL               0x30

#define CMD_RESPONSE_ACK                0x06
#define CMD_RESPONSE_NAK                0x15

#define HARDWARE_REV_UNKNOWN            0
#define HARDWARE_REV_AB                 1
#define HARDWARE_REV_C                  2



# proces








## public
- cHandleWaterLevel
- vHandleDrainOverflow
- vHandleErrorAndAlarm
- ucOutsideWorkingHours
- vSetError
- vClearError
- ucReadUsage
- ucStoreUsage
- vHandleOperatingHours
- vDisplayTimeRemaining
- vHandleConductivitySensorError

## ucOutsideWorkingHours
## usGetFanSpeed
## ucCalculateDamperExhaustPercentage
## ucCalculateDamperRecirculationPercentage
## ucCalculateDamperDiffuserPercentage
## ucCalculateHeatingCapacityPercentage
## ucCalculateFanSpeed
## vHandleDrainRinse
vHandleDrainOverflow

vSetError
vClearError
vHandleErrorAndAlarm
cHandleWaterLevel

vHandleRecirculation



ucCheckHygienePeriod



ucCalculateWetBulbEfficiency
ucConductivityAboveThreshold

vActuatorTestTask


vSensorTestTask

vSystemTest


vDisplay
vClearAllErrorsAndAlarms
ucReadUsage
vHandleOperatingHours
ucStoreUsage
ucInWinterPeriod




ucGetModeBasedOnTempOrThermostat


vHandleDiffPressAlarm





vHandleValveAndPumpProtection
vHandleTimeFromThermostat
vDisplayTimeRemaining
vHandleConductivitySensorError
