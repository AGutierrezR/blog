---
layout: post-template
title:  "CSS Grid para Principiantes"
date:   2019-11-11 12:00:00 +0200
categories: jekyll update
---

CSS Grid nos permite construir una Grilla (Grid) con más flexibilidad y control que el que podríamos tener con Bootstrap, Bulma o Foundation. La diagramación con Grid nos da la habilidad de dividir una página web en filas y columnas con propiedades simples. Nos otorga la posibilidad de posicionar y dimensionar cada elemento dentro del Grid usando solo CSS, sin tener que cambiar nada en el HTML.

## Definiendo un Grid

Con este modulo de CSS, vienen dos nuevos valores para la propiedad `display ` los cuales son `grid` y `inline-grid`. Cuando se establece el valor `grid` o `inline-grid` a la propiedad `display ` de cualquier elemento, se convierte en **grid container** y sus hijos directos se convierten en **grid items**

Vamos a formar un layout de 3x3, creemos una tabla para jugar Tic-Tac-Toe (o la vieja como se dice en mi pais). Primero escribamos el HTML:

```html
<div class="frame">
  <div class="game-board">
    <div class="box"> </div>
    <div class="box"> </div>
    <div class="box"> </div>
    <div class="box"> </div>
    <div class="box"> </div>
    <div class="box"> </div>
    <div class="box"> </div>
    <div class="box"> </div>
    <div class="box"> </div>
  </div>
</div>
```

Ahora escribimos un estilo inicial, lo cual nos servirá para poder apreciar los cambios al usar CSS Grid:

```css
.frame {
  margin: 0 auto;
  background-color: #34495e;
  border: 6px solid #2c3e50;
  border-radius: 10px;
}

.box {
  background-color: #5773AC;
  border-radius: 10px;
}
```

Con esto tendriamos una base visual como este:

![cssgrid-base-structure]({{ site.baseurl }}/assets/img/cssgrid-base-structure.png)

Ahora convirtamos el div `.game-board` en un **grid container** y los div `.box` se convertirán en **grid items** automáticamente:

```css
.game-board {
  display: grid;
}
```

Esto no genera algun cambio visual en nuestro. 

CSS Grid nos traen nuevas propiedades a la mesa. La primera de la que vamos a hablar es `grid-template-rows`, la cual nos deja especificar el numero de filas (rows) y el tamaño que deberían tener cada una en el grid.

La segunda propiedad es `grid-template-columns` que nos permite especificar el numero de columnas y el tamaño que deberían tener cada unas en el grid. El valor de estas dos propiedades se puede establecer en `px`, `rem`, `em` porcentajes y una unidad nueva llamada `fr`. De `fr` hablaremos más adelante.

Para nuestra tabla de Tic-Tac-Toe escribimos el siguiente código en `.game-board`:

```css
.game-board {
  display: grid;
  grid-template-rows: 200px 200px 200px;
  grid-template-columns: 200px 200px 200px;
}
```

Con esto tendremos 3 columnas de `200px` cada una y 3 filas de `200px` cada uno. Al revisar el navegador tendremos algo como:

![cssgrid-display-applied]({{ site.baseurl }}/assets/img/cssgrid-display-applied.png)



## La unidad 'fr' (fracción)

'fr' es una nueva unidad para Grid Layout. Nos ayuda a deshacernos de los cálculos con porcentajes y divide el espacio en fracciones de espacio disponible.

Por ejemplo, si usamos `grid-template-rows: 2fr 3fr` en un bloque de elementos gris, el grid container va, primeramente, a dividirse en 2 filas. Luego las partes fraccionadas se van a sumar dando un total de 5 en este caso.

Ahora tendremos **2 filas**. La primera tomara 2/5ths del espacio vertical. La segunda tomara 3/5 del espacio vertical.

Regresando a nuestro proyecto, vamos a usar `fr` en vez de `px`. Lo que queremos es sean 3 columnas y 3 filas. por lo que vamos a reemplazar los 3 `200px` por 3 `1fr`:

```css
.game-board {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}
```

Si revisamos el resultado veremos que ha cambiado y ya no existen los elementos `.box`, siguen alli pero no tienen dimensión. Tendremos algo similar a esto:

![cssgrid-base-structure]({{ site.baseurl }}/assets/img/cssgrid-base-structure.png)

Para nuestra sanidad mental, vamos a agregarle un espacio en blanco a cada `.box` usando el símbolo `&nbsp;` 

```html
<div class="frame">
  <div class="game-board">
    <div class="box">&nbsp;</div>
    <div class="box">&nbsp;</div>
    <div class="box">&nbsp;</div>
    <div class="box">&nbsp;</div>
    <div class="box">&nbsp;</div>
    <div class="box">&nbsp;</div>
    <div class="box">&nbsp;</div>
    <div class="box">&nbsp;</div>
    <div class="box">&nbsp;</div>
  </div>
</div>
```

Y ahora obtendremos esto:

![cssgrid-whitespace-added]({{ site.baseurl }}/assets/img/cssgrid-whitespace-added.png)

Si observamos bien, la distribucion horizontal si se esta cumpliendo, pero la vertical no, esto ocurre ya que `fr` toma el espacio del **Grid Container** tanto `width` como `height` y lo divide entre el numero de `fr` establecido. Nuestro `.game-board` no posee `height` y el `width` es del 100% por ser un bloque. Para solventar esto podemos establecer `width` y `height` a nuestro `.game-board`. En este caso demosles 600px por 600px:

```css
.game-board {
  height: 600px;
  width: 600px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}
```

Ya que nuestro `.game-board` mide 600px por 600px, Grid puede dividir las fracciones en 3 y da como resultado 200px por 200px cada uno de los `.box`. Ahora nuestro nuestro Tic-Tac-Toc estara igual que antes

![cssgrid-display-applied]({{ site.baseurl }}/assets/img/cssgrid-display-applied.png)

## La funcion `repeat()`

En algunos casos, tendremos que trabajar con muchas columnas y filas. Especificar cada una en la propiedad `grid-template` seria tedioso. Por suerte existe la función `repeat` la cual es como un bucle que repita cierto valor un numero determinado de veces. Acepta dos argumentos. El primero es el numero de iteraciones y el segundo es el valor que será repetido. Vamos a implementarlo en el código anterior:

```css
.game-board {
  height: 600px;
  width: 600px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}
```

## La propiedad `grid-template`

Existe una manera más corta de establecer las propiedades `grid-template-rows` y `grid-template-columns`, la cual es la propiedad `grid-template`. Esta es la sintaxis:

```css
grid-template: <rows> / <columns>;
```

`<row>` y `<column>` van separados por un `/`. Usando esta propiedad, nuestro código luciría:

```css
.game-board {
  height: 600px;
  width: 600px;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
}
```

## Espaciado entre Columnas y Filas

El modulo Grid de CSS viene una propiedad para controlar el espacio que existen entre columnas y filas a esto se llama gap y la propiedad es `grid-column-gap`y `grid-row-gap`. Está acepta cualquier unidad a excepción de `fr`:

Vamos a agregarle un espacio de `10px` entre columnas y entre filas:

```css
.game-board {
  height: 600px;
  width: 600px;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}
```

Existe una manera más corta de establecer estos dos valores a cual es con la propiedad `grid-gap`. Esta es la sintaxis:

```css
grid-gap: <row> <column>
```

Usando esta propiedad, nuestro código luciría:

```css
.game-board {
  height: 600px;
  width: 600px;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-gap: 10px 10px;
}
```

Si incluimos un valor, CSS asumirá que debe usar ese valor para row y columnas, por lo que ` grid-gap: 10px 10px;` es igual a `grid-gap: 10px;`

Nuestro Juego debe lucir:

![cssgrid-display-applied]({{ site.baseurl }}/assets/img/cssgrid-final-result.png)