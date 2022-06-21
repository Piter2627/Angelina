---
layout: post
title: How to drag and drop directories
date: 2022-02-11
authors:
  - thomassteiner
description: |
  Learn how to drag and drop directories into the browser.
tags:
  - how-to
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/KCv8lABRHGUhhCznlMUB.jpg
alt: Pensive woman.
---

The
[HTML Drag and Drop interfaces](https://developer.mozilla.org/docs/Web/API/HTML_Drag_and_Drop_API)
enable web applications to accept
[dragged and dropped files](https://developer.mozilla.org/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop)
on a web page. During a drag and drop operation, dragged file and directory items are associated
with file entries and directory entries respectively. When it comes to dragging and dropping files
into the browser, there are two ways of doing it: the modern and the classic way.

## The modern way

### Using the File System Access API's `DataTransferItem.getAsFileSystemHandle()` method

The `DataTransferItem.getAsFileSystemHandle()` method returns a promise with a
`FileSystemFileHandle` object if the dragged item is a file, and a promise with a
`FileSystemDirectoryHandle` object if the dragged item is a directory. These handles let you read,
and optionally write back to the file or directory. Note that the Drag and Drop interface's
[`DataTransferItem.kind`](https://developer.mozilla.org/docs/Web/API/DataTransferItem/kind) will be
`"file"` for both files _and_ directories, whereas the File System Access API's
[`FileSystemHandle.kind`](https://wicg.github.io/file-system-access/#dom-filesystemhandle-kind) will
be `"file"` for files and `"directory"` for directories.

{% BrowserCompat 'api.DataTransferItem.getAsFileSystemHandle' %}

## The classic way

### Using the non-standard `DataTransferItem.webkitGetAsEntry()` method

The `DataTransferItem.webkitGetAsEntry()` method returns the drag data item's `FileSystemFileEntry`
if the item is a file, and `FileSystemDirectoryEntry` if the item is a directory. While you can read
the file or directory, there is no way to write back to them. This method has the disadvantage that
is not on the standards track, but has the advantage that it supports directories.

{% BrowserCompat 'api.DataTransferItem.webkitGetAsEntry' %}

## Progressive enhancement

The snippet below uses the modern File System Access API's
`DataTransferItem.getAsFileSystemHandle()` method when it is supported, then falls back to the
non-standard `DataTransferItem.webkitGetAsEntry()` method, and finally falls back to the classic
`DataTransferItem.getAsFile()` method. Be sure to check the type of each `handle`, since it could be
either of:

- `FileSystemDirectoryHandle` when the modern code path is chosen.
- `FileSystemDirectoryEntry` when the non-standard code path is chosen.

All types have a `name` property, so logging it is fine and will always work.

```js
const supportsFileSystemAccessAPI =
  'getAsFileSystemHandle' in DataTransferItem.prototype;
const supportsWebkitGetAsEntry =
  'webkitGetAsEntry' in DataTransferItem.prototype;

const elem = document.querySelector('main');

elem.addEventListener('dragover', (e) => {
  // Prevent navigation.
  e.preventDefault();
});

elem.addEventListener('dragenter', (e) => {
  elem.style.outline = 'solid red 1px';
});

elem.addEventListener('dragleave', (e) => {
  elem.style.outline = '';
});

elem.addEventListener('drop', async (e) => {
  e.preventDefault();
  if (!supportsFileSystemAccessAPI && !supportsWebkitGetAsEntry) {
    // Cannot handle directories.
    return;
  }

  elem.style.outline = '';

  const fileHandlesPromises = [...e.dataTransfer.items]
    .filter((item) => item.kind === 'file')
    .map((item) =>
      supportsFileSystemAccessAPI
        ? item.getAsFileSystemHandle()
        : item.webkitGetAsEntry(),
    );

  for await (const handle of fileHandlesPromises) {
    if (handle.kind === 'directory' || handle.isDirectory) {
      console.log(`Directory: ${handle.name}`);
    }
  }
});
```

## Demo

You can see the above snippet in action in the
[demo](https://how-to-series.glitch.me/drag-and-drop-directories.html) embedded below and explore
the [source code](https://glitch.com/edit/#!/how-to-series?path=drag-and-drop-directories.js) on
Glitch.

<div class="glitch-embed-wrap" style="height: 500px; width: 100%;">
  <iframe
    src="https://how-to-series.glitch.me/drag-and-drop-directories.html"
    style="height: 100%; width: 100%; border: 0;"
  >
  </iframe>
</div>

## Further reading

- [File System Access API](/file-system-access/)
- [Drag and Drop API](/drag-and-drop/)

## Acknowledgements

Hero image by [Eunice Lituañas](https://unsplash.com/@euniveeerse)
on [Unsplash](https://unsplash.com/photos/bpxgyD4YYt4).
