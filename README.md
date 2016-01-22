# jquery-data-toggle
A very small lib that allows some elements to toggle other ones.

## Really short documentation

  1. Include this in your page:
  
  ```html
  <script src="jquery-data-toggle.js"></script>
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
  <button type="button" data-toggle=".foo">Bar</button>
  <div class="foo">Foo</div>
  <div class="foo">Bar</div>
  <div class="foo">Baz</div>
  ```
  
  3. You can group some elements. So when you toggle one element of a group, it will automatically hide the others.
  
  ```html
  <button type="button" data-toggle=".menu--first" data-toggle-group="menus">Open first menu</button>
  <button type="button" data-toggle=".menu--second" data-toggle-group="menus">Open second menu</button>
  <button type="button" data-toggle=".menu--third" data-toggle-group="menus">Open third menu</button>
  ...
  ```
  
Now, if you don't see any change when you click on an element that have data-toggle attribute, there are two possibilities:
  * Your selector is bad or doesn't target anything
  * You didn't noticed that data-toggle isn't using show() and hide() functions of jQuery, but simply add and remove the class "active" from the toggle element and the targeted ones.
  
Enjoy!

## Todo

  * Trigger custom event if needed, by adding an attribute like that:
  
  ```html
  <button type="button" data-toggle="#menu" data-toggle-event="open-menu">Open menu</button>
  ...
  <script>
  $(???).on('open-menu', function(e){
    // ...
  });
  </script>
  ```
