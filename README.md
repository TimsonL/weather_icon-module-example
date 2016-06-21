# Yandex Maps API Weather Icon Module

`WeatherTempIcon` is module, which allows you to place a mark on the map, containing information about the weather at the chosen region
using `placeIconWithTemp` method.

## Loading

1. Put module source code ([weather_icon.js](https://github.com/TimsonL/weather_icon-module-example/blob/master/weather_icon.js)) on your CDN.

2. Load both [Yandex Maps JS API 2.1](http://api.yandex.com/maps/doc/jsapi/) and module source code by adding following code into &lt;head&gt; section of your page
   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
   <!-- Change ... to your CDN host name -->
   <script src=".../weather_icon.js" type="text/javascript"></script>
   ```

3. Get access to module functions by using [ymaps.modules.require](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/modules.require.xml) method
   ```js
   ymaps.modules.require(['WeatherTempIcon']).spread(function () {
        var weatherIcon = new weatherIconWithTemp(appid, {options});
   });
   ```

## weatherIconWithTemp constructor

| Parameter | Default value | Decription |
|---------|-----------------------|----------|
| appid | - | Type: string.<br>Appid required for proper module functioning. Available at openweather.org |
|  options |  - | Type: Object.<br>weatherIconWithTemp representation options. |
|  options.tempType | 'cel' | Type: string.<br>Type of data of the temperature. Can be `'far'` for imperial system and `'kel'` for kelvin. |
|  options.iconLayout |  `templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="img_layout"><img src={{properties.url}}><div class="text_layout">{{properties.tempText}}</div></div></div>');` | Type: Object.<br>Option for layout of the icon. |


## Methods

| Name| Returns | Description |
|----|------------|----------|
| placeIconWithTemp | geoObject | Returns a place mark as geoObject. |

#### Parameters:
| Parameter | Default value | Description |
|---------|-----------------------|----------|
| searchRequest | - | Type: String, number or object.<br>Access weather data through pointing name of the city, it's id or latitude and longitude coordinates |

