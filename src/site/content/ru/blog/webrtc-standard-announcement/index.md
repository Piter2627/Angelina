---
title: WebRTC — стандарт W3C и IETF
subhead: |2-

  Краткий обзор истории, архитектуры, примеров использования и будущего WebRTC.
description: |2-

  Краткий обзор истории, архитектуры, примеров использования и будущего WebRTC.
date: 2021-01-26
updated: 2021-01-26
authors:
  - huib
tags:
  - blog
  - media
---

Установление веб-стандарта — это длительный процесс, во время которого определяются и обеспечиваются его полезность, согласованность и совместимость с браузерами. Сегодня [W3C и IETF](https://www.w3.org/2021/01/pressrelease-webrtc-rec.html.en) отмечают завершение работы над стандартом, который оказался, пожалуй, одним из важнейших во время пандемии: WebRTC.

{% Aside %} Ознакомьтесь с практическим заданием [Взаимодействие в реальном времени с помощью WebRTC](https://codelabs.developers.google.com/codelabs/webrtc-web), которое представляет собой руководство по внедрению WebRTC. {% endAside %}

## История {: #history }

WebRTC — это платформа, позволяющая браузерам, мобильным и настольным приложениям взаимодействовать в режиме реального времени. Обычно такие возможности используются для видеозвонков. Платформа WebRTC состоит из набора необходимых технологий и стандартов. Компания Google предложила идею создания WebRTC в 2009 г. в качестве альтернативы Adobe Flash и настольным приложениям, которые не могли работать в браузере. Предыдущее поколение браузерных продуктов было разработано на основе лицензируемой проприетарной технологии. В их число входил и сервис Hangouts. Впоследствии корпорация Google купила компании, которые предоставляли лицензию на эту технологию, и превратила ее в проект с открытым исходным кодом — WebRTC. Соответствующий код был интегрирован в Chrome и используется большинством приложений, применяющих WebRTC. Благодаря совместным усилиям разработчиков других браузеров и лидеров отрасли, таких как Mozilla, Microsoft, Cisco и Ericsson, в W3C и IETF началась работа по стандартизации WebRTC.  В 2013 г. Mozilla и Google [продемонстрировали](https://blog.chromium.org/2013/02/hello-firefox-this-is-chrome-calling.html) видеозвонок между своими браузерами. По мере развития стандарта многие архитектурные обсуждения привели к различиям в реализации WebRTC в разных браузерах и поставили под вопрос совместимость и и возможность взаимодействия. Большинство разногласий были в конечном итоге урегулированы в процессе завершения работы над стандартом в прошедшие годы. Спецификация WebRTC теперь сопровождается [полным набором платформенных тестов](https://wpt.fyi/results/webrtc?label=experimental&label=master&aligned) и инструментов для обеспечения совместимости. Браузеры в значительной степени адаптировали собственные реализации соответствующим образом. Это положило конец сложному периоду, когда веб-разработчикам приходилось постоянно адаптировать собственные сервисы к различным браузерам и изменениям в спецификации.

## Архитектура и функциональность {: #architecture }

[`RTCPeerConnection` API](https://developer.mozilla.org/docs/Web/API/RTCPeerConnection) — центральная часть спецификации WebRTC. `RTCPeerConnection` связывает два приложения на разных конечных точках для обмена данными с использованием однорангового протокола. `PeerConnection` API тесно взаимодействует с [`getUserMedia`](https://developer.mozilla.org/docs/Web/API/MediaDevices/getUserMedia) для обеспечения доступа к камере и микрофону, а также с [`getDisplayMedia`](https://developer.mozilla.org/docs/Web/API/MediaDevices/getDisplayMedia) — для записи содержимого экрана. WebRTC позволяет отправлять и получать потоки, которые включают в себя аудио- и (или) видеоконтент, а также произвольные двоичные данные, — посредством `DataChannel`. Основа любой реализации WebRTC — мультимедийные функции для обработки, кодирования и декодирования аудио и видео. WebRTC поддерживает различные аудиокодеки (самый популярный и универсальный — Opus). Реализации WebRTC должны поддерживать использование для обработки видео как бесплатного видеокодека VP8 от Google, так и H.264. Подключения WebRTC всегда шифруются, что делается с помощью двух существующих протоколов: DTLS и SRTP.  WebRTC в значительной степени опирается на существующие стандарты и технологии, включая видеокодеки (VP8, H264), прохождение по сети (ICE), транспорт (RTP, SCTP) и протоколы описания мультимедиа (SDP). Всё это связано вместе более чем в 50 рабочих предложениях (RFC).

## Примеры использования: когда важна каждая миллисекунда {: #use-cases }

WebRTC широко используется в требовательных ко времени отклика приложениях в таких областях, как удаленная хирургия, системный мониторинг и удаленное управление автономными автомобилями, а также голосовые и видеозвонки на основе UDP, когда буферизация невозможна. Практически все браузерные сервисы видеозвонков от таких компаний, как Google, Facebook, Cisco, RingCentral и Jitsi, используют WebRTC. В сервисах Google Stadia и NVIDIA GeForce NOW с помощью WebRTC видеопоток геймплея из облака передается в веб-браузер без заметных задержек.

## Из-за пандемии повысились требования к качеству видеозвонков {: #performance }

За последний год использование WebRTC в Chrome увеличилось в 100 раз — в результате увеличения количества видеозвонков из браузера. Понимая, что во время пандемии видеозвонки стали фундаментальной частью жизни многих людей, разработчики браузеров начали оптимизировать соответствующие технологии. И это было особенно важно, поскольку по мере перехода сотрудников компаний и учащихся на удаленную работу и учебу ресурсоемкие звонки с больших числом участников и видеоэффектами в видеовстречах стали более распространенным явлением.  За последний год энергоэффективность Chrome в видеозвонках выросла на 30 %, а для случаев интенсивного использования планируются и дальнейшие оптимизации. Во время пандемии Mozilla, Apple и Microsoft [внесли значительные улучшения](https://www.youtube.com/watch?v=YZROn-WsyO4) в собственные реализации WebRTC — в частности, чтобы обеспечить соответствие формальному стандарту.

## Будущее WebRTC {: #future }

WebRTC является стандартом W3C, но процесс совершенствования технологии не остановился. Новый видеокодек AV1, который [снижает сетевую нагрузку на 50 %](https://blog.google/products/duo/4-new-google-duo-features-help-you-stay-connected/), становится доступным в WebRTC и веб-браузерах. Ожидается, что последующие улучшения в базе открытого исходного кода еще больше снизят задержку и повысят качество транслируемого видео. [WebRTC NV](https://www.w3.org/TR/webrtc-nv-use-cases/) собирает инициативы по созданию дополнительных API, которые позволяет реализовать новые варианты применения технологии. Сюда входят расширения существующих API, дающие больший контроль над существующими функциями (например, для [масштабируемого кодирования видео](https://www.w3.org/TR/webrtc-svc/)), а также API для доступа к [низкоуровневым компонентам](https://github.com/w3c/mediacapture-insertable-streams/blob/main/explainer.md), которые открывают перед веб-разработчикам широкие возможности по внедрению новшеств за счет интеграции специальных высокопроизводительных компонентов WebAssembly. Мы ожидаем, что с развитием 5G-сетей и повышением спроса на интерактивные сервисы в течение следующего года увеличится количество проектов, построенных на базе WebRTC.
