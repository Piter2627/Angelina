---
layout: codelab
title: Отложенная загрузка изображений за пределами экрана при помощи lazysizes
authors:
  - katiehempenius
description: В этом интерактивном уроке вы узнаете, как при помощи lazysizes загружать только изображения, находящиеся в текущей области просмотра.
date: 2018-11-05
glitch: lazysizes
related_post: use-lazysizes-to-lazyload-images
tags:
  - performance
---

Отложенная загрузка — это подход, при котором ресурсы загружаются не заранее, а только тогда, когда в них возникает необходимость. Это позволяет повысить производительность за счет уменьшения объема ресурсов, которые необходимо загрузить и обработать во время начальной загрузки страницы.

Изображения, которые во время начальной загрузки страницы находятся за пределами экрана, являются идеальными кандидатами для применения этого метода. А главное, при помощи [lazysizes](https://github.com/aFarkas/lazysizes) реализовать эту стратегию очень просто.

## Добавьте на страницу скрипт lazysizes

{% Instruction 'remix' %}

Файл `lazysizes.min.js` уже скачан и добавлен в данный проект Glitch. Чтобы подключить его к странице:

- Добавьте в `index.html` следующий тег `<script>`:

```html/0
  <script src="lazysizes.min.js" async></script>
  <!-- Images End -->
</body>
```

{% Aside %} Файл [lazysizes.min.js](https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/lazysizes.min.js) уже добавлен в проект, так что не нужно добавлять его дополнительно. Скрипт, который вы только что добавили, уже имеет к нему доступ. {% endAside %}

По мере того как пользователь прокручивает страницу, lazysizes интеллектуально загружает изображения, отдавая приоритет тем изображениям, которые пользователь увидит в ближайшее время.

## Укажите изображения для отложенной загрузки

- Добавьте к изображениям, для которых следует использовать отложенную загрузку, класс `lazyload`, а также переименуйте атрибут `src` в `data-src`.

Например, для `flower3.png` изменения будут выглядеть так:

```html/1/0
<img src="images/flower3.png" alt="">
<img data-src="images/flower3.png" class="lazyload" alt="">
```

В рамках данного примера попробуйте включить отложенную загрузку для `flower3.png`, `flower4.jpg` и `flower5.jpg`.

{% Aside %} Возможно, вам интересно, зачем нужно переименовывать атрибут `src` в `data-src`. Причина в том, что если этого не сделать, то все изображения будут загружаться моментально, а не в режиме отложенной загрузки. Браузер не распознает атрибут `data-src`, поэтому не загружает изображение, встречая тег с таким атрибутом. В нашем случае это полезно, так как позволяет lazysizes управлять загрузкой изображений вместо браузера. {% endAside %}

## Проверьте страницу в действии

Вот и все! Чтобы увидеть эти изменения в действии, выполните следующие шаги:

{% Instruction 'preview' %}

- Откройте консоль и найдите в ней только что добавленные изображения. По мере прокрутки страницы их класс должен меняться с `lazyload` на `lazyloaded`.

{% Img src="image/admin/yXej5KAOMzoqoQAB2paq.png", alt="отложенная загрузка изображений", width="428", height="252" %}

- Следите за сетевой панелью, чтобы видеть, как при прокрутке страницы файлы изображений загружаются один за другим.

{% Img src="image/admin/tcQpLeAubOW1l42eyXiW.png", alt="отложенная загрузка изображений", width="418", height="233" %}

## Подтвердите результат с помощью Lighthouse

Наконец, рекомендуется проверить внесенные изменения при помощи Lighthouse. Если вы забыли добавить отложенную загрузку каких-либо изображений за пределами экрана, проверка производительности Lighthouse «Defer offscreen images» («Откладывание изображений за пределами экрана») выявит такие изображения.

{% Instruction 'preview', 'ol' %} {% Instruction 'audit-performance', 'ol' %}

1. Убедитесь, что страница прошла проверку **Defer offscreen images**.

{% Img src="image/admin/AWMJnCEi3IAgANHhTgiC.png", alt="Прохождение проверки «Efficiently encode images» в Lighthouse", width="800", height="774" %}

Готово! Вы добавили на свою страницу отложенную загрузку изображений.
