# jquery-data-toggle (beta)

This repo is discontinued! Please use https://github.com/christophermh44/data-toggle-js

A small lib that allows some elements to toggle classes on other ones, just by clicking on/touching the trigger.

## Really short documentation

  0. Installation
  
  You can install jquery-data-toggle using bower or github:

  ```bash
  git clone https://github.com/christophermh44/jquery-data-toggle
  # OR
  bower install jquery-data-toggle
  ```

  1. Include this in your page:
  
  ```html
  <script src="jquery-data-toggle.js"></script>
  ```
  
  and somewhere else:
  
  ```html
  <script>$.dataToggle.init()</script>
  ```
  
  Yes, you also need to have jQuery inside your page.
  
  2. Add some attributes to your code:
  
  ```html
  <button type="button" data-toggle="#menu">Open menu</button>
  ...
  <div id="menu">
  </div>
  ```
  
  When you will click on this button, it will toggle the #menu element of the DOM (show/hide alternatively).
  
  **Brotip**: you can target elements like this if you don't want to use classes or ids:
  
  ```html
  <button type="button" data-toggle="[data-toggle-id='menu']">Open menu</button>
  <div data-toggle-id="menu">
  </div>
  ```
  
  jquery-data-toggle is also able to toggle many targets at once.

  ```html
  <button type="button" data-toggle=".foo, .bar">Bar</button>
  <div class="foo">Foo</div>
  <div class="bar">Bar</div>
  <div class="foo">Baz</div>
  ```
  
  3. You can group some elements. So when you toggle one element of a group, it will automatically hide the others.
  
  ```html
  <button type="button" data-toggle=".menu--first" data-toggle-group="menus">Open first menu</button>
  <button type="button" data-toggle=".menu--second" data-toggle-group="menus">Open second menu</button>
  <button type="button" data-toggle=".menu--third" data-toggle-group="menus">Open third menu</button>
  …
  ```
  
  You can make the elements belong to many groups by separating their names with a space.
  
  **Brotip #2**: If you want to close all opened elements by clicking inside the body, just add this to the body:
  
  ```html
  <body data-toggle data-toggle-group="group names here">
  ```
  
  Or, this example shows you how to close all active elements by clicking inside the body:
  
  ```html
  <body data-toggle=".active">
  ```
  
  4. You can edit the classes that will be toggled:
  
  ```html
  <button data-toggle="…" data-toggle-class="enabled">Enable</button>
  ```
  
  Many classes can be toggled, separate them with a space.

  5. You can trigger events when an element is toggled:

  ```html
  <button data-toggle="#menu" data-toggle-event="dt-enabled">Enable</button>
  …
  <script>
  $('#menu').on('dt-enabled', function(ev, status) {
    alert('so, you was just ' + status ? 'showing' : 'hiding' + ' me!');
  });
  ```
  
  Many events can be triggered, separate them with a space. Keep in mind that events are triggered on target elements from DOM, not on triggerer ones.
  
  6. Additionnal use: javascript functions
  
  You can also manage your bindings with Javascript. Here are the functions provided:
  
  * **$.dataToggle.bind(trigger, target[, options])**: manual binding of a toggle
  * **$.dataToggle.unbind([triggerExpression])**: unbind a specific toggle with trigger expression, or all bounded toggles if no parameter is set
  * **$.dataToggle.refresh()**: function that refreshes all binds (unbind all, then rebind all)
  
Now, if you don't see any change when you click on an element that have data-toggle attribute, there are two possibilities:
  * Your selector is bad or doesn't target anything
  * You didn't noticed that data-toggle isn't using show() and hide() functions of jQuery, but simply add and remove classes from/to the toggle element and the targeted ones.
  
Enjoy!

## Just a few last words…

Let me know if you experiment some bugs, and feel free to suggest me some improvments!
