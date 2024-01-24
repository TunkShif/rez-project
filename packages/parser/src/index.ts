let sample = `
* Crack [#(3) (eggs)] into a {blender}.
* Add [#(125)@(g) (flour)], [#(250)@(ml) (milk)] and [#(1)@(pinch) of (salt)].
* Blitz until smooth.
* Pour into a bowl and leave to stand for <#(15) @(minutes)>.
* Melt the [(butter)] (or [(a drizzle of oil)]- if you want to be a bit healthier) in a {large non-stick frying pan|pan} on a medium heat.
* Tilt the {pan|pan} so the butter coats the surface.
* Pour in [#(1) @(ladle) of (batter)] and tilt again, so that the batter spreads all over the base.
* Cook for <#(1~2) @(minutes)>, or until it starts to come away from the sides.
* Once golden underneath, flip the pancake over and cook for <#(1) further @(minute)>, or until cooked through.
* Serve straightaway with your favourite topping. Add [(your favorite topping)] here to make sure it's included in your meal plan!
`

const ingredientSample = `
* Crack 3 eggs into a blender.
* Crack [#(3
* Crack [#3 (eggs)] into a {blender}.
* Crack [#3 (eggs) into a {blender}.
* Crack [#(3
* Crack [#(3) (eggs)] into a {blender}.
* Crack [#(3 (eggs)] into a {blender}.
* Crack [#(3 [#(3) (eggs)] into a blender.
`
