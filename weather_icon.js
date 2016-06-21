ymaps.modules.define('WeatherTempIcon', ['templateLayoutFactory', 'util.defineClass', 'Placemark', 'vow.Promise', 'vow'],
  function(provide, templateLayoutFactory, defineClass, Placemark, promise, vow) {
    var weatherIconWithTemp = defineClass(function(appid, options) {
      this._appid = appid;
      options = options || {};
      this._tempType = options.tempType || 'cel';
      this._iconLayout = options.iconLayout || templateLayoutFactory.createClass(
          '<div class="placemark_layout_container"><div class="img_layout"><img src={{properties.url}}><div class="text_layout">{{properties.tempText}}</div></div></div>'
      );

    }, {
      placeIconWithTemp: function(searchRequest) {
        var deferred = vow.defer();

        this._makeRequest(searchRequest).done($.proxy(function(data) {
            var tempText = Math.round(data.main.temp);
            if (this._tempType === 'kel') {
              tempText += "K";
            } else if (this._tempType === 'far') {
              tempText += "°F";
            } else {
              tempText += "°C";
            }
          
            var iconPlacemark = new Placemark([data.coord.lat, data.coord.lon], {
              url: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
              tempText: tempText
            }, {
              iconLayout: this._iconLayout
            });
          
            deferred.resolve(iconPlacemark);

        }, this), deferred.reject);

        return deferred.promise();
      },

      _makeRequest: function(data) {
        var typeofData = typeof data;
        var url = "http://api.openweathermap.org/data/2.5/weather?appid=" + this._appid;

        if (typeofData == "string") {
          url += "&q=" + data;
        } else if (typeofData == "number") {
          url += "&id=" + data;
        } else if (typeofData == "object") {
          url += "&lat=" + data[0] + "&lon=" + data[1];
        }
        if (this._tempType == 'cel') {
          url += "&units=metric";
        } else if (this._tempType == 'far') {
          url += "&units=imperial";
        }
        
        return $.ajax({
          url: url,
          type: "GET",
          dataType: "json",
        });
      }
    });
  
    provide(weatherIconWithTemp);
  });

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map('map', {
    center: [55.733835, 37.588227],
    zoom: 5
  }, {
    searchControlProvider: 'yandex#search'
  });

  ymaps.modules.require(['WeatherTempIcon'])
    .spread(
      function(weatherIconWithTemp) {

        var weather = new weatherIconWithTemp('5308e518b6ff52c10a905835dbdd6e98', {
          tempType: 'kel'
        });
        weather.placeIconWithTemp('Moscow')
          .then(function(geoObject) {
            myMap.geoObjects.add(geoObject);
          });
      }
    )
}