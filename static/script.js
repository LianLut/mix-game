const ingredientsList = [
    "черника", "какао-порошок", "корица", "молоко", "вода",
    "финики", "творог", "мед", "мята", "кофе", "орео",
    "тапиока", "черный чай (листовой)", "карамель"
];

const encodedRecipes = [
    { n: "Американо", i: "americano.png", ing: "5,9" },
    { n: "Тропическое какао", i: "tropic_cacao.png", ing: "1,3,4,2,5" },
    { n: "Творожный смузи", i: "curd_smoothie.png", ing: "0,6,3,7,8" },
    { n: "Кофейное орео", i: "coffee_oreo.png", ing: "8,10,3,9" },
    { n: "Бабл-ти карамельный", i: "caramel_bubble_tea.png", ing: "3,4,11,12,13" },
    { n: "Бабл ти", i: "bubble_tea.png", ing: "3,4,11,12" },
    { n: "Кофе с молоком", i: "coffee_milk.png", ing: "3,9" },
    { n: "Мятный кофе", i: "mint_coffee.png", ing: "3,9,8" },
    { n: "Медовый кофе", i: "honey_coffee.png", ing: "3,9,7" },
    { n: "Карамельный кофе", i: "caramel_coffee.png", ing: "3,9,13" },
    { n: "Коричный кофе", i: "cinnamon_coffee.png", ing: "3,9,2" },
    { n: "Татарский чай", i: "tatar_tea.png", ing: "12,4,3" },
    { n: "Чай", i: "tea.png", ing: "4,12" },
    { n: "Какао с молоком", i: "cacao.png", ing: "3,1" },
    { n: "Какао на воде", i: "cacao_water.png", ing: "4,1" },
    { n: "Молочный коктейль", i: "milkshake.png", ing: "0,3" }
];


function decodeRecipes() {
    return encodedRecipes.map(recipe => ({
        name: recipe.n,
        image: recipe.i,
        ingredients: recipe.ing.split(',').map(i => ingredientsList[parseInt(i)])
    }));
}

const recipes = decodeRecipes();
let selectedIngredients = [];

function initIngredients() {
    const grid = document.getElementById('ingredients-grid');
    ingredientsList.forEach(ing => {
        const btn = document.createElement('button');
        btn.className = 'ingredient-btn';
        btn.textContent = ing;
        btn.onclick = () => {
            if (selectedIngredients.includes(ing)) {
                selectedIngredients = selectedIngredients.filter(i => i !== ing);
                btn.classList.remove('selected');
            } else {
                selectedIngredients.push(ing);
                btn.classList.add('selected');
            }
        };
        grid.appendChild(btn);
    });
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, i) => val === sortedB[i]);
}

function findRecipe() {
    if (selectedIngredients.length === 0) return null;
    
    for (let recipe of recipes) {
        if (arraysEqual(recipe.ingredients, selectedIngredients)) {
            return recipe;
        }
    }
    return null;
}

function mixDrink() {
    if (selectedIngredients.length === 0) {
        alert("Выбери хотя бы один ингредиент!");
        return;
    }
    
    document.getElementById('mix-btn').style.display = 'none';
    document.getElementById('shaker').classList.remove('hidden');
    
    setTimeout(() => {
        const recipe = findRecipe();
        document.getElementById('shaker').classList.add('hidden');
        
        if (recipe) {
            document.getElementById('result-img').src = `static/images/${recipe.image}`;
            document.getElementById('result-name').textContent = recipe.name;
        } else {
            document.getElementById('result-img').src = `static/images/fail.png`;
            document.getElementById('result-name').textContent = "Ничего не получилось! Попробуй другую комбинацию";
        }
        
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('reset-btn').classList.remove('hidden');
    }, 2000);
}

function resetGame() {
    selectedIngredients = [];
    document.querySelectorAll('.ingredient-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('mix-btn').style.display = 'block';
    document.getElementById('result').classList.add('hidden');
    document.getElementById('reset-btn').classList.add('hidden');
    document.getElementById('shaker').classList.add('hidden');
}

document.getElementById('mix-btn').onclick = mixDrink;
document.getElementById('reset-btn').onclick = resetGame;

initIngredients();