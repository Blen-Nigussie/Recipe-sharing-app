const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("../models/Recipe");

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Sample Data
const recipes = [
  //  Breakfast
  {
    title: "Fluffy Pancakes",
    description: "A timeless classic, fluffy pancakes are light, airy, and perfect for a slow morning. They can be customized with various toppings like fresh berries, maple syrup, chocolate chips, or whipped cream.",
    ingredients: ["1 ½ cups all-purpose flour", "3 ½ teaspoons baking powder", "1 teaspoon salt", "1 tablespoon white sugar", "1 ¼ cups milk", "1 egg", "3 tablespoons melted butter"],
    steps: [
      "In a large bowl, whisk together the dry ingredients: flour, baking powder, salt, and sugar.",
      "In a separate bowl, whisk together the wet ingredients: milk, egg, and melted butter.",
      "Pour the wet ingredients into the dry ingredients and mix until just combined. The batter should be slightly lumpy.",
      "Heat a lightly oiled griddle or frying pan over medium-high heat.",
      "Pour about ¼ cup of batter for each pancake. Cook until bubbles appear on the surface (about 2-3 minutes).",
      "Flip and cook until browned on the other side.",
      "Serve hot with your favorite toppings."
    ],
    category: "Breakfast",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/fluffy_pancake.png",
  },
  {
    title: "Avocado Toast with Egg",
    description: "A trendy and healthy breakfast that's both simple to make and delicious. Creamy mashed avocado on toasted bread, topped with a perfectly cooked egg, is a great way to start the day.",
    ingredients: ["1 slice of your favorite bread (sourdough is great)", "1 ripe avocado", "1 egg", "salt", "black pepper", "red pepper flakes (optional)"],
    steps: [
      "Toast the slice of bread to your desired crispness.",
      "While the bread is toasting, mash the avocado in a small bowl and season with salt and pepper.",
      "Cook the egg to your preference (fried, poached, or scrambled).",
      "Spread the mashed avocado evenly over the warm toast.",
      "Place the cooked egg on top of the avocado.",
      "Sprinkle with red pepper flakes and an extra pinch of salt and pepper to taste."
    ],
    category: "Breakfast",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/avocado_toast.png",
  },
  {
    title: "Classic Omelet",
    description: "A versatile and protein-packed breakfast that can be filled with a variety of ingredients. A fluffy egg base can be filled with cheese, vegetables, or meats to create a satisfying and savory meal.",
    ingredients: ["2-3 eggs", "1 tablespoon milk", "salt", "pepper", "1 teaspoon butter", "your choice of fillings (e.g., shredded cheese, diced ham, chopped bell peppers, spinach)"],
    steps: [
      "In a bowl, whisk the eggs, milk, salt, and pepper until light and frothy.",
      "Melt the butter in a non-stick frying pan over medium heat.",
      "Pour the egg mixture into the pan. As the eggs set, gently push the cooked edges toward the center, tilting the pan so the uncooked eggs flow to the edges.",
      "When the eggs are mostly set but still a little wet on top, sprinkle your desired fillings over one half of the omelet.",
      "Carefully fold the other half of the omelet over the fillings.",
      "Cook for another minute until the cheese is melted and the omelet is heated through."
    ],
    category: "Breakfast",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/omelette.png",
  },

  //  Lunch
  {
    title: "Grilled Chicken Salad",
    description: "A light and healthy salad featuring tender, seasoned grilled chicken breast over a bed of fresh mixed greens. Topped with cherry tomatoes, cucumbers, and a zesty lemon vinaigrette.",
    ingredients: ["1 boneless, skinless chicken breast", "2 cups mixed greens", "1/2 cup cherry tomatoes, halved", "1/4 cup chopped cucumber", "2 tbsp olive oil", "1 tbsp lemon juice", "salt and pepper to taste"],
    steps: [
      "Season chicken breast with salt and pepper and grill until fully cooked. Let it rest for a few minutes before slicing.",
      "In a large bowl, combine mixed greens, cherry tomatoes, and cucumber.",
      "In a small bowl, whisk together olive oil and lemon juice to create a simple dressing.",
      "Add the sliced chicken to the salad, drizzle with dressing, and toss gently to combine."
    ],
    category: "Lunch",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/grilled_chicken_salad.png",
  },
  {
    title: "Vegetable Wrap",
    description: "A quick and satisfying lunch wrap packed with fresh, crunchy vegetables and a creamy spread. This is a great grab-and-go option for a light, meat-free meal.",
    ingredients: ["1 large tortilla or wrap", "1/4 cup hummus or cream cheese", "1/2 cup shredded lettuce", "1/4 cup shredded carrots", "1/4 cup chopped cucumber", "1/4 cup bell pepper strips"],
    steps: [
      "Lay the tortilla flat on a clean surface.",
      "Spread a layer of hummus or cream cheese evenly over the tortilla, leaving about an inch clear around the edges.",
      "Arrange the lettuce, carrots, cucumber, and bell pepper in a line down the center of the wrap.",
      "Fold in the sides of the tortilla, then roll it tightly from the bottom. Slice in half and serve."
    ],
    category: "Lunch",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/vegetable_wrap.png",
  },
  {
    title: "Turkey Sandwich",
    description: "A classic and hearty sandwich featuring deli turkey and cheddar cheese on your choice of bread. A quick and easy lunch that's perfect for a packed meal.",
    ingredients: ["2 slices of bread", "3-4 slices of deli turkey", "1 slice of cheddar cheese", "1-2 lettuce leaves", "1 tbsp mayonnaise or mustard"],
    steps: [
      "Toast the bread lightly if desired.",
      "Spread mayonnaise or mustard on one side of each slice of bread.",
      "Layer the turkey and cheese on one slice of bread.",
      "Add the lettuce and any other desired toppings.",
      "Top with the second slice of bread, cut in half, and serve."
    ],
    category: "Lunch",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/turkey_sandwich.png",
  },

  //  Dinner
  {
    title: "Grilled Salmon",
    description: "A healthy and delicious main course, this grilled salmon is flaky and flavorful. It's often seasoned simply with salt and pepper and topped with a fresh lemon butter sauce.",
    ingredients: ["1 salmon fillet", "1 tbsp olive oil", "1/2 lemon, sliced", "2 tbsp butter", "salt and black pepper to taste"],
    steps: [
      "Pat the salmon fillet dry and season both sides generously with salt and pepper.",
      "Brush the fillet with olive oil.",
      "Preheat your grill or grill pan to medium-high heat. Grill the salmon, skin-side up, for 4-6 minutes, then flip and grill for another 3-5 minutes, or until cooked through.",
      "While the salmon cooks, melt the butter and squeeze in a little lemon juice.",
      "Remove the salmon from the grill, top with the lemon butter sauce, and serve immediately."
    ],
    category: "Dinner",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/grilled_salmon.png",
  },
  {
    title: "Steak and Potatoes",
    description: "A classic, comforting meal featuring a perfectly seared steak and creamy, savory mashed potatoes. This dish is a satisfying dinner for any occasion.",
    ingredients: ["1 steak (e.g., ribeye or sirloin)", "2 large potatoes", "2 cloves garlic", "2 tbsp butter", "1/4 cup milk", "salt and pepper to taste"],
    steps: [
      "Pat the steak dry, season with salt and pepper, and sear in a hot pan for 3-5 minutes per side for medium-rare, or to your desired doneness.",
      "While the steak is resting, peel and boil the potatoes until tender. Drain them and return to the pot.",
      "Add butter, milk, and minced garlic to the potatoes. Mash until smooth and season with salt and pepper.",
      "Slice the steak and serve it alongside the mashed potatoes."
    ],
    category: "Dinner",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/steak_and_potato.png",
  },
  {
    title: "Vegetable Stir Fry",
    description: "A fast and flavorful dinner option. This stir fry combines a mix of fresh vegetables with a savory sauce, served over rice or noodles.",
    ingredients: ["1 cup broccoli florets", "1 carrot, sliced", "1 bell pepper, sliced", "1/4 cup soy sauce", "1 tbsp grated ginger", "1 tbsp cooking oil"],
    steps: [
      "Heat cooking oil in a large skillet or wok over high heat.",
      "Add the harder vegetables first (broccoli and carrots) and stir fry for 2-3 minutes.",
      "Add the bell peppers and ginger, and continue to stir fry for another 2 minutes.",
      "Pour in the soy sauce and stir to coat all the vegetables. Cook for one more minute until the sauce thickens slightly.",
      "Serve immediately over rice or noodles."
    ],
    category: "Dinner",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/vegetable_stir_fry.png",
  },

  //  Snacks
  {
    title: "Fruit Smoothie",
    description: "A refreshing and healthy beverage, this fruit smoothie is made with a mix of fresh or frozen berries and banana. It's a quick and energizing snack or a light breakfast.",
    ingredients: ["1 ripe banana, frozen", "1/2 cup frozen strawberries", "1/2 cup yogurt", "1/2 cup milk or juice", "1 tbsp honey or maple syrup (optional)"],
    steps: [
      "Place all ingredients into a blender.",
      "Blend on high until the mixture is completely smooth and creamy.",
      "Pour into a glass and serve immediately."
    ],
    category: "Snacks",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/fruit_smoothie.png",
  },
  {
    title: "Granola Bars",
    description: "Homemade granola bars are a perfect on-the-go snack. They are chewy, customizable, and packed with wholesome ingredients like oats, nuts, and dried fruit.",
    ingredients: ["2 cups rolled oats", "1/2 cup honey or maple syrup", "1/2 cup peanut butter", "1/2 cup chopped nuts (almonds or walnuts)", "1/4 cup raisins or chocolate chips"],
    steps: [
      "Preheat oven to 350°F (175°C). Line a baking pan with parchment paper.",
      "In a large bowl, mix together the oats, nuts, and raisins.",
      "In a saucepan, heat the honey and peanut butter until melted and smooth. Pour this mixture over the dry ingredients and stir to combine.",
      "Press the mixture firmly into the prepared pan. Bake for 20-25 minutes, then let it cool completely before slicing into bars."
    ],
    category: "Snacks",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/granola_bar.png",
  },
  {
    title: "Popcorn",
    description: "A classic, light, and crunchy snack. Popcorn is a simple treat that can be made on the stovetop and seasoned to your liking.",
    ingredients: ["1/2 cup popcorn kernels", "2 tbsp oil (coconut or vegetable)", "1/4 cup melted butter", "salt to taste"],
    steps: [
      "Heat oil in a large pot with a lid over medium-high heat. Add a few kernels and wait for them to pop. This indicates the oil is hot enough.",
      "Add the remaining kernels, cover the pot, and shake it gently to ensure the kernels are evenly coated.",
      "Cook until the popping slows down to several seconds between pops. Remove from heat.",
      "Pour the popcorn into a large bowl, drizzle with melted butter, and toss with salt."
    ],
    category: "Snacks",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/popcorn.png",
  },

  //  Desserts
  {
    title: "Chocolate Cake",
    description: "A rich and decadent dessert, this moist chocolate cake is a crowd-pleaser. Layers of soft cake are often topped with a creamy chocolate frosting.",
    ingredients: ["1 ½ cups all-purpose flour", "1 cup granulated sugar", "½ cup cocoa powder", "1 tsp baking soda", "½ tsp salt", "1 cup milk", "½ cup vegetable oil", "1 tsp vanilla extract"],
    steps: [
      "Preheat oven to 350°F (175°C) and grease a round cake pan.",
      "In a large bowl, whisk together the flour, sugar, cocoa powder, baking soda, and salt.",
      "Add the milk, oil, and vanilla extract. Whisk until the batter is smooth.",
      "Pour the batter into the prepared pan and bake for 30-35 minutes, or until a toothpick inserted into the center comes out clean.",
      "Let the cake cool completely before frosting and serving."
    ],
    category: "Desserts",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/chocolate_cake.png",
  },
  {
    title: "Fruit Tart",
    description: "A beautiful and elegant dessert. A buttery tart shell is filled with a sweet cream and topped with an assortment of colorful fresh fruits and a shiny glaze.",
    ingredients: ["1 pre-made tart shell", "1 cup vanilla custard or pastry cream", "1 cup mixed berries", "1 kiwi, sliced", "1/4 cup apricot jam (for glaze)"],
    steps: [
      "Bake the tart shell according to package directions and let it cool completely.",
      "Fill the cooled tart shell evenly with the vanilla custard.",
      "Arrange the mixed berries and kiwi slices neatly on top of the custard.",
      "In a small saucepan, heat the apricot jam until it becomes a thin liquid. Brush the warm glaze over the fruit for a glossy finish.",
      "Refrigerate for at least 30 minutes before serving."
    ],
    category: "Desserts",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/fruit_tart.png",
  },
  {
    title: "Ice Cream Sundae",
    description: "A classic and customizable dessert. This simple sundae features scoops of ice cream topped with chocolate syrup, whipped cream, and a cherry.",
    ingredients: ["2 scoops of your favorite ice cream (vanilla is classic)", "2 tbsp chocolate syrup", "whipped cream", "1 maraschino cherry"],
    steps: [
      "Place the scoops of ice cream in a tall glass or bowl.",
      "Drizzle the chocolate syrup over the ice cream.",
      "Top with a generous swirl of whipped cream.",
      "Finish with a maraschino cherry on top and serve immediately."
    ],
    category: "Desserts",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/ice_creame_sande.png",
  },

  //  Popular
  {
    title: "Margherita Pizza",
    description: "An iconic Italian dish, the Margherita pizza is celebrated for its simplicity and fresh flavors. It features a thin crust topped with San Marzano tomatoes, fresh mozzarella, basil, and a drizzle of olive oil, representing the colors of the Italian flag.",
    ingredients: ["Pizza dough", "San Marzano tomatoes", "Fresh mozzarella cheese", "Fresh basil leaves", "Olive oil", "Salt"],
    steps: [
      "Preheat your oven and a pizza stone to a very high temperature.",
      "Stretch the pizza dough into a thin circle.",
      "Spread a layer of crushed San Marzano tomatoes over the dough.",
      "Tear the mozzarella into small pieces and distribute them over the sauce.",
      "Bake in the hot oven for 10-15 minutes, or until the crust is golden and the cheese is bubbly.",
      "Remove from the oven, top with fresh basil leaves, a drizzle of olive oil, and a pinch of salt."
    ],
    category: "Popular",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/margherita_pizza.png",
  },
  {
    title: "Sushi (California Roll)",
    description: "Hailing from Japan, sushi is an art form of combining vinegared rice with various ingredients like fresh seafood, vegetables, and seaweed. This particular recipe focuses on a popular 'California Roll' with its simple yet delicious combination of crab, avocado, and cucumber.",
    ingredients: ["Sushi rice", "Nori seaweed sheets", "Imitation crab meat", "Cucumber strips", "Avocado slices", "Rice vinegar", "Sugar", "Soy sauce", "Wasabi (optional)"],
    steps: [
      "Prepare the sushi rice by cooking and then mixing it with a blend of rice vinegar and sugar.",
      "Lay a sheet of nori on a bamboo mat. Spread an even layer of the prepared sushi rice over the nori.",
      "Arrange the imitation crab, cucumber, and avocado in a line across the center of the rice.",
      "Using the bamboo mat, carefully roll the sushi tightly.",
      "Slice the roll into bite-sized pieces with a sharp, wet knife.",
      "Serve with soy sauce and wasabi for dipping."
    ],
    category: "Popular",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/california_roll.png",
  },
  {
    title: "Tacos",
    description: "Tacos are a traditional Mexican street food that has become a global favorite. They are incredibly versatile, consisting of a corn or flour tortilla filled with a variety of meats, such as seasoned beef or chicken, and topped with fresh ingredients like salsa, cilantro, and onion.",
    ingredients: ["1 lb ground beef", "Taco seasoning", "Corn or flour tortillas", "Shredded lettuce", "Diced tomatoes", "Shredded cheese", "Salsa", "Sour cream"],
    steps: [
      "In a skillet, cook the ground beef over medium-high heat until browned. Drain any excess grease.",
      "Stir in the taco seasoning and water according to package directions. Simmer for a few minutes.",
      "Warm the tortillas in a separate pan or in the microwave.",
      "To assemble, spoon the seasoned beef into the center of a warm tortilla.",
      "Top with shredded lettuce, diced tomatoes, and cheese.",
      "Serve with a dollop of salsa and sour cream."
    ],
    category: "Popular",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/tacos.png",
  },
  {
    title: "Chicken Tikka Masala",
    description: "This rich and creamy curry is a beloved dish that originated in India. It features tender chunks of marinated chicken in a vibrant, spiced tomato and cream sauce, making it a perfect example of comfort food with complex, aromatic flavors.",
    ingredients: ["1 lb chicken breast, cubed", "½ cup yogurt", "1 tbsp tikka masala paste", "1 tbsp ginger-garlic paste", "1 can (15 oz) tomato sauce", "½ cup heavy cream", "1 tbsp butter", "Fresh cilantro for garnish"],
    steps: [
      "Marinate the cubed chicken in yogurt, tikka masala paste, and ginger-garlic paste for at least 30 minutes.",
      "Heat butter in a large pan over medium heat. Add the marinated chicken and cook until browned on all sides.",
      "Stir in the tomato sauce and bring to a simmer. Cook for 15-20 minutes, until the chicken is cooked through.",
      "Reduce the heat to low, stir in the heavy cream, and simmer for another 5 minutes. Do not boil.",
      "Garnish with fresh cilantro and serve hot with naan bread or rice."
    ],
    category: "Popular",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/chicken_tikka_masala.png",
  },
  {
    title: "Ramen",
    description: "A classic Japanese noodle soup, ramen has achieved global popularity. This dish consists of a savory broth, firm noodles, and toppings that can range from slices of pork to soft-boiled eggs and green onions.",
    ingredients: ["4 cups chicken or pork broth", "1 package instant ramen noodles (or fresh ramen noodles)", "2 slices of cooked pork belly or chicken", "1 soft-boiled egg, halved", "2 green onions, chopped", "1 tsp soy sauce", "1 tsp sesame oil"],
    steps: [
      "In a saucepan, heat the chicken or pork broth until it reaches a gentle boil. Stir in the soy sauce and sesame oil.",
      "Cook the ramen noodles separately according to package instructions.",
      "Drain the noodles and place them in a serving bowl.",
      "Pour the hot broth over the noodles.",
      "Carefully arrange the toppings on top of the noodles and broth: the cooked meat slices, soft-boiled egg, and chopped green onions.",
      "Serve immediately while the soup is hot."
    ],
    category: "Popular",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/ramen.png",
  },
  {
    title: "Paella",
    description: "A vibrant and iconic Spanish dish from Valencia, paella is a flavorful rice dish cooked in a large shallow pan. It’s known for its rich, smoky flavor from saffron and paprika, and it can be made with a variety of ingredients, including seafood, chicken, or vegetables.",
    ingredients: ["1 large boneless, skinless chicken breast", "2 tbsp olive oil", "1 diced onion", "1 red bell pepper, diced", "2 cloves garlic, minced", "1 tsp smoked paprika", "A pinch of saffron threads", "1 ½ cups paella rice (or Arborio rice)", "4 cups chicken broth", "1 cup seafood (shrimp and mussels are common)"],
    steps: [
      "Season the chicken with salt and pepper. Heat the olive oil in a large pan and cook the chicken until browned. Remove and set aside.",
      "In the same pan, sauté the onion, bell pepper, and garlic until softened.",
      "Stir in the smoked paprika, saffron threads, and rice. Toast for about 2 minutes.",
      "Pour in the chicken broth and stir to combine. Bring to a simmer.",
      "Add the cooked chicken and seafood to the pan, nestling them into the rice.",
      "Cover and cook on low heat for 15-20 minutes, or until the rice is cooked and most of the liquid is absorbed. Do not stir the rice during this step to allow for the classic crispy bottom, or 'socarrat.'"
    ],
    category: "Popular",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/paella.png",
  },
  {
    title: "Fish and Chips",
    description: "A classic British comfort food, fish and chips is a satisfying meal of battered, deep-fried white fish served with thick-cut fries. It's often seasoned with a sprinkle of salt and vinegar and served with tartar sauce or mushy peas.",
    ingredients: ["1 lb cod or haddock fillets", "3 large potatoes (russet or similar)", "Vegetable oil for frying", "1 cup all-purpose flour", "1 tsp baking powder", "1 cup cold beer or sparkling water", "Salt and vinegar for serving"],
    steps: [
      "Peel and cut the potatoes into thick-cut fries. Blanch them in boiling water for 3-4 minutes, then drain and pat dry.",
      "Heat a pot of vegetable oil to 350°F (175°C).",
      "In a bowl, whisk together the flour, baking powder, and a pinch of salt. Slowly pour in the cold beer or sparkling water until you have a smooth batter.",
      "Pat the fish fillets completely dry. Season with salt and pepper, then dip each piece into the batter, ensuring it is fully coated.",
      "Carefully lower the battered fish into the hot oil and fry for 5-7 minutes, until golden brown and crispy.",
      "Remove the fish and place it on a wire rack to drain. Raise the oil temperature to 375°F (190°C) and fry the blanched potatoes until golden and crispy."
    ],
    category: "Popular",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/fish_and_chips.png"
,
  },
  {
    title: "Feijoada",
    description: "Considered the national dish of Brazil, feijoada is a rich and hearty stew of black beans with various cuts of pork and beef. This flavorful and slow-cooked dish is often served with rice, collard greens, and orange slices to help cut through the richness.",
    ingredients: ["1 lb dried black beans", "1 lb assorted smoked pork and beef (e.g., smoked sausage, bacon, pork ribs)", "1 large onion, chopped", "4 cloves garlic, minced", "2 bay leaves", "1 tsp ground coriander", "Salt and pepper to taste", "Cooked rice and collard greens for serving"],
    steps: [
      "Soak the black beans overnight. The next day, drain and rinse them.",
      "In a large pot, combine the soaked beans with the smoked meats, onion, garlic, bay leaves, and enough water to cover.",
      "Bring to a boil, then reduce the heat and simmer, covered, for 2-3 hours, or until the beans are tender and the meat is cooked.",
      "Remove the bay leaves. Mash some of the beans against the side of the pot to thicken the stew.",
      "Season with ground coriander, salt, and pepper to taste.",
      "Serve hot over white rice, with a side of sautéed collard greens and fresh orange slices."
    ],
    category: "Popular",
    image: "https://enbla-recipe-sharing-app-16il.onrender.com/uploads/img/feijoada.png",
  },
];

async function seedRecipes() {
  try {
    const count = await Recipe.countDocuments();
    if (count === 0) { // only seed if DB is empty
      await Recipe.insertMany(recipes);
      console.log("Sample recipes added to DB.");
    } else {
      console.log("DB already has data, skipping seeding.");
    }
  } catch (err) {
    console.error("Error seeding recipes:", err);
  }
}
module.exports = seedRecipes;

