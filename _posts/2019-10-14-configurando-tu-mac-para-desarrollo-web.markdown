---
layout: post-template
title:  "Configurando tu Mac para Desarrollo Web"
date:   2019-10-14 13:34:42 +0200
categories: jekyll update
---

Este post describe como configuro mi ambiente de desarrollo en una MacBook o iMac. Configuraremos Node y algo de Ruby, principalmente para el ambiente de JavaScript.

Todos estos pasos fueron probados en macOS Mojave (también funciona en Catalina).

Si tienes algunas sugerencias o comentarios me puedes escribir por Instagram o Twitter.

## Actualizar el sistema operativo.

Este primer paso suena algo tonto, pero créeme, es muy importante tener tu sistema operativo actualizado. Para ello ingresa a **Apple Icon > Preferencias del Sistema > Actualización de Software**.

## Preferencias del Sistema

Para sentirme cómodo en mi equipo, me gusta configurar algunos detalles en la forma como interactuó con él. Estas configuraciones son algo personal:

En **Apple Icon > Preferencias del Sistema**:

- Trackpad > Presionar para hacer clic
- Dock > Ocultar y mostrar el Dock automáticamente
- Dock > Mostrar apps recientes en el Dock (desmarcar)

## Preparando el ambiente

### Homebrew

Homebrew es el gestor de paquetes más popular en macOS, que permitirá instalar aplicaciones (por medio de Homebrew Cask) y librerías de lenguajes de programación.

Homebrew depende de un compilador. El mas fácil de instalar es el paquete *Xcode Command Line Tools*. Para instalarlo, abrimos la Terminal e introducimos el siguiente comando:

```shell
xcode-select --install
```

### Instalando Homebrew

Una vez instalado *Xcode Command Line Tools* podremos instalar Homebrew, solo ingresamos el siguiente comando en la terminal:

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Para mas información sobre Homebrew puedes ingresar a su pagina [brew.sh](https://brew.sh/index_es).

### Cambiando de Bash a Zsh

Como desarrollador se pasa mucho tiempo en la Terminal y Zsh es un shell muy cómodo con el que trabajar ya que te permite usar *Oh-My-Zsh*. 

Primero verificamos si Zsh instalado (si esta en macOS Mojave es muy probable que si), para ello, entramos al terminal he introducimos:

```shell
zsh --version
```

El resultado debe ser `zsh 5.1.1` o mayor. 

Para hacer de Zsh el shell por principal, introducimos en la terminal:

```shell
echo $SHELL
```

El resultado debe ser `/usr/bin/zsh`.

### Oh-My-Zsh

*Oh-My-Zsh* es un framework para Zsh que agrega un montón de características, como no tener que usar `cd` para cambiar de directorio, un auto completado más intuitivo ,etc. Aquí dejo la definición que sus creadores le dan:

> Oh-My-Zsh es un marco encantador, de código abierto y dirigido por la comunidad para administrar su configuración Zsh. Viene con miles de funciones útiles, ayudantes, complementos, temas y algunas cosas que te hacen gritar...

Para instarlo, simplemente abrimos la Terminal e introducimos:


```shell
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Una vez terminado todo el proceso de instalación, cerramos y abrimos la terminal y veremos la diferencia

### Instalando Git

Xcode Command Line Tools incluye una copia de Git, pero esta no se encuentra actualizada.

Para instalar la nueva versión de Git usando Homebrew. Introducimos el siguiente comando en la Terminal:

```shell
brew install git
```

Una vez instalado es momento de configurar el usuario de Git, el cual debe coincidir con los usados en GitHub o GitLab o BitBucket. Esta configuración requiere de dos comandos:

```shell
git config --global user.name "Tu nombre"
git config --global user.email "tucorreo@dominio.com"
```

Esta información será agregada a `.gitconfig`.

### Instalando n: Node.js version management

`n` es una herramienta que permite instalar y gestionar varias versiones de Nodejs. Para instalarlo, debemos introducir el siguiente comando en la terminal:

```shell
curl -L https://git.io/n-install | bash
```

Por defecto el descarga la version LTS y npm. Para verificar que node esta instalado:

```shell
node -v 
```

Para saber mas sobre `n` visita [aqui](https://github.com/tj/n)

### Instalando Yarn

Yarn es un gestor de paquetes similar a NPM, instalarlo no es algo vital pero no está de más tener esta opción en caso que un proyecto lo recomiende

#### Si `n` no esta instalado

En la terminal:

```shell
brew install yarn
```

Con este comando instalaras yarn y la ultima versión de NodeJS.

#### Si `n` esta instalado:

1. En la terminal

    ```shell
    brew install yarn --ignore-dependencies
    ```

2. Revisamos `node` en el entorno `$PATH`

    ```shell
    which node
    ```
    debería retornar => `/Users/<your's-user-name>/n/bin/node`

3. Revisamos `brew doctor`, debería mostrar un mensaje de ADVERTENCIA diciendo que no existe las dependencias de yarn

    ```shell
    brew doctor
    ```

    Si retorna algo como:
    ```
    Warning: Some installed formulae are missing dependencies.
    You should `brew install` the missing dependencies:
        brew install node

    Run `brew missing` for more details.
    ```
    Continua con el siguiente paso
  
4. Creamos vinculo de n para Homebrew
  
    ```shell
    ln -s ~/n/ /usr/local/Cellar/node
    ```

5. Revisamos `brew doctor` otra vez. No debería ningún mensaje de ADVERTENCIA.

    ```shell
    brew doctor
    ```

### Instalando un editor de texto

Para que puedas escribir código necesitas un editor de texto (o en su defecto un IDE). Te sugiero usar Visual Studio Code o Atom. Para instalarlos hacemos uso de Cask de Homebrew:

Para instalar Visual Studio Code, introduce el siguiente código en la terminal:

```shell
brew cask install visual-studio-code
```

Para instalar Atom, introduce el siguiente código en la terminal:

```shell
brew cask install atom
```

### Configurando un directorio para los proyectos

Mantén tus proyectos separados de todo (no los coloques en Documentos, ni Escritorio), esto permite tener un orden y evitar que se nos pierda su ubicación entre carpetas de otros interés

Creamos una carpeta llamada Code en el Home y en esta guardamos todos nuestros proyectos.

```
codes/
    proyecto1/
    proyecto2/
    proyecto3/
```