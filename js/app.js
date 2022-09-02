
var app = {
    gridSize: 10,
    pixelSize: 30,
    colorsList: ['black', 'grey', 'orange', 'green'],
    currentColor: 'black',

    drawBoard: function(gridSizeWanted, pixelSizeWanted) {
        var invaderHTMLElement = document.getElementById('invader');
        
        invaderHTMLElement.textContent = '';
    
        for (var i = 0; i < gridSizeWanted; i++) {
            var line = document.createElement('div');
        
            line.classList.add('line');
        
            for(var j = 0; j < gridSizeWanted; j++) {
                var pixel = document.createElement('div');
        
                pixel.classList.add('pixel');

                pixel.style.width = `${pixelSizeWanted}px`;
                pixel.style.height = `${pixelSizeWanted}px`;

                pixel.addEventListener('click', app.handleClick);
        
                line.appendChild(pixel);
            }
        
            invaderHTMLElement.appendChild(line);
        }
    },

    handleClick: function(event) {

        var pixelClicked = event.target;
        
        var classList = pixelClicked.classList;

        if (classList.contains(app.currentColor)) {
            pixelClicked.className = 'pixel';
        } else {
            pixelClicked.className = `pixel ${app.currentColor}`;
        }
    },

    drawForm: function() {
        var formHTMLElement = document.getElementsByClassName('configuration')[0];
        
        var gridSizeInputHTMLElement = document.createElement('input');
        
        gridSizeInputHTMLElement.placeholder = 'Taille de la grille';
        gridSizeInputHTMLElement.type = 'number';
        
        formHTMLElement.appendChild(gridSizeInputHTMLElement);

        var pixelSizeInputHTMLElement = document.createElement('input');
        
        pixelSizeInputHTMLElement.placeholder = 'Taille des pixels';
        pixelSizeInputHTMLElement.type = 'number';
        
        formHTMLElement.appendChild(pixelSizeInputHTMLElement);
        
        var buttonHTMLElement = document.createElement('button');
        
        buttonHTMLElement.textContent = 'Valider';
        
        formHTMLElement.appendChild(buttonHTMLElement);
    
        formHTMLElement.addEventListener('submit', function(event) {
            event.preventDefault();
    
            var newGridSize = gridSizeInputHTMLElement.value;

            if(newGridSize !== '') {
                app.gridSize = Number(newGridSize);
            }

            var newPixelSize = pixelSizeInputHTMLElement.value;

            if(newPixelSize !== '') {
                app.pixelSize = Number(newPixelSize);
            }

            app.drawBoard(app.gridSize, app.pixelSize);
        });
    },

    drawColorPalette: function() {

        var paletteContainer = document.createElement('div');
        
        paletteContainer.id = 'palette-container';
        
        for (var color of app.colorsList) {
        
            var paletteColorHTMLElement = document.createElement('a');
        
            paletteColorHTMLElement.classList.add('palette-color');

            paletteColorHTMLElement.dataset.color = color;
        
            paletteColorHTMLElement.classList.add(color);

            paletteColorHTMLElement.addEventListener('click', function(event) {
                var oldChoosenColorHTMLElement = document.getElementsByClassName('palette-color--active')[0];

                if (oldChoosenColorHTMLElement) {
                    oldChoosenColorHTMLElement.classList.remove('palette-color--active');
                }

                var clickedColorHTMLElement = event.target;

                clickedColorHTMLElement.classList.add('palette-color--active');

                app.currentColor = clickedColorHTMLElement.classList[1];

            });
        
            paletteContainer.appendChild(paletteColorHTMLElement);
        
        }
        
        document.body.appendChild(paletteContainer);
        
    },

    init: function() {
        app.drawBoard(app.gridSize, app.pixelSize);

        app.drawForm();

        app.drawColorPalette();
    }
};

app.init();
