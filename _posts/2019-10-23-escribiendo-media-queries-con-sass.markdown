---
layout: post-template
title: "Escribiendo media queries con Sass"
date: 2019-10-23 5:00:00 +0200
categories: jekyll update
---

En la actualidad, diseño responsivo es vital para el desarrollo web. Existe una multitud de dispositivos desde los que se puede acceder a la web. Debemos asegurarnos que todos los usuarios de una pagina puedan engancharse con el producto.

Para realizar esto, los Media Queries son esenciales para adaptar la diagramación en los distintos dispositivos.

## ¿Que es un Media Queries?

Es un modulo de CSS3 que permite renderizar el contenido y que se adapte a ciertas condiciones como la resolución de la pantalla. Por ejemplo:

```css
@media (max-width: 599px) {
  font-size: 1rem;
}
```

Aquí estamos configurando el `font-size` a `1rem` cuando el tamaño del viewport <=`599px`

Es bastante simple, pero para desarrollar una web responsiva haremos uso de muchos media queries. Para hacernos más fácil esta labor, debemos establecer los puntos de quiebre (breakpoints) para implementar reglas de diagramación. Y si nuestro proyecto es muy grande, necesitamos un método para trabajar con ellos. Por eso usaremos los Mixins de Sass

## Mixins

Sass nos permite crear trozos reusables de código, a esto le llamamos Mixins. Ayudan a reducir la repetición, y nos permiten un mantenimiento más fácil.

### Configurando nuestros mixins

La creación de un Mixin es sencilla, para ello iniciamos con `@mixin` seguido del nombre que le asignaremos, dentro de él irá el bloque de código, ejemplo:

```scss
@mixin for-mobile-only {
  @media (max-width: 768px) {
    @content;
  }
}

@mixin for-tablet {
  @media (min-width: 768px) {
    @content;
  }
}

@mixin for-desktop {
  @media (min-width: 1024px) {
    @content;
  }
}

@mixin for-widescreen {
  @media (min-width: 1216px) {
    @content;
  }
}

@mixin for-fullhd {
  @media (min-width: 1408px) {
    @content;
  }
}
```

Hemos escrito 5 breakpoints comunes en bloques mixins. El `@content` es una directiva de Sass que nos permite insertar contenido más adelante.

### Usando un mixin

Supongamos que queremos usar un media queries para reducir el tamaño de la letra para teléfonos solamente. Agregamos el mixin como un `@include`, de esta manera:

```scss
.page-title {
  font-size: 1.5rem @include for-phone-only {
    font-size: 1rem;
  }
}
```

Cuando compilemos nuestro proyecto, nuestros @include se convertirá en:

```css
.page-title {
  font-size: 1.5rem;
}

@media (max-width: 599px) {
  .page-title {
    font-size: 1rem;
  }
}
```

Con esto tendremos la habilidad de insertar nuestros media queries dónde queramos en nuestros proyectos. No tendremos que memorizar breakpoints ya que los tenemos predefinidos. Y si queremos modificarlos podemos hacerlo editando los mixins y se modificaran en todo el proyecto.

## Conclusion

Sass nos simplifica las tareas en CSS, escribir media queries ya no tiene que ser un dolor de cabeza. Con los Mixins de Sass, hemos centralizado la localización donde administraremos los media queries. Y así el manejo de las características responsivas de nuestros proyectos será mucho mas fácil.
