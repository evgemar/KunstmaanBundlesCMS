CKEDITOR.plugins.add( 'quecity', {
    icons: 'noimage',
    init: function( editor ) {

        var config = editor.config;
        editor.ui.addRichCombo( 'questStyles', {
            label : 'Quest Styles',
            title : 'Quest Styles',
            multiSelect : false,

            panel :
            {
                css : [ CKEDITOR.getUrl( editor.skinPath + 'editor.css' ) ].concat( config.contentsCss )
            },

            init : function()
            {

                this.add( 'ec-block', 'Сворачиваемый-разворачиваемый' );
                this.add( 'figure', 'Цифро' );
                this.add( 'quote', 'Цитатник' );
                this.add( 'steps', 'Шаги' );
                this.add( 'map', 'Карта' );
                this.add( 'sample-answer', 'Пример ответа' );
                // Default value on first click
                //this.setValue('name', 'name');
            },

            onClick : function( value )
            {
                var txt = '';
                switch(value){
                    case 'ec-block':
                        txt = '<div class="block-1">' +
                        '<div class="ec-block">' +
                        '<h3 class="ec-title">Lorem ipsum</h3>' +
                        '<div class="ec-cont">' +
                        '<p>dolor sit amet</p>' +
                        '</div>' +
                        '</div></div>';
                        break;
                    case 'figure':
                        txt = '<div class="block-1">' +
                        '<div class="unit-figure">' +
                        '<h3>2004</h3>' +
                        '<h4>год</h4>' +
                        '<p>Именно в этом году в Беларуси появились новые банкноты без зайчиков.</p>' +
                        '</div></div>';
                        break;
                    case 'quote':
                        txt = '<div class="block-1">' +
                        '<div class="unit-quote">' +
                        '<h3>Именно в этом году появились новые банкноты без зайчиков.</h3>' +
                        '<h4>А. С. Пушкин</h4>' +
                        '</div>' +
                        '</div>';
                        break;
                    case 'steps':
                        txt = '<nav class="block-1">' +
                        '<ul class="unit-steps">' +
                        '<li>Переходите с площади на сторону магазина «Каравай»</li>' +
                        '<li>Переходите с площади на сторону магазина «Каравай»</li>' +
                        '<li>Переходите с площади на сторону магазина «Каравай»</li>' +
                        '<li>Переходите с площади на сторону магазина «Каравай»</li>' +
                        '<li>Переходите с площади на сторону магазина «Каравай»</li>' +
                        '<li>Переходите с площади на сторону магазина «Каравай»</li>' +
                        '<li>Переходите с площади</li></ul></nav>';
                        break;
                    case 'map':
                        txt = '<div class="block-1 unit-map" style="background-image: url('../../../../../img/bg/engine/map-sample.jpg')"><a class="expand-btn" href="geo:<lat>,<lon>">Открыть маршрут</a></div>';
                        break;
                    case 'sample-answer':
                        txt = '<p class="hint">the answer should be a noun, such as a sofa</p>';
                        break;
                }
                editor.focus();
                editor.fire( 'saveSnapshot' );

                editor.insertHtml(txt, 'unfiltered_html');

                editor.fire( 'saveSnapshot' );
            },
        });
    }
});