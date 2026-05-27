const ingredientsList = [
    "черника", "какао-порошок", "корица", "молоко", "вода",
    "финики", "творог", "мед", "мята", "кофе", "орео",
    "тапиока", "черный чай (листовой)", "карамель",
    "алкоголь", "хлеб", "гранат", "щепотка шерсти",
    "яблоко"
];

const recipes = [
    { name: "Американо", image: "americano.png", ingredients: ["кофе", "вода"] },
    { name: "Тропическое какао", image: "tropic_cacao.png", ingredients: ["какао-порошок", "молоко", "вода", "корица", "финики"] },
    { name: "Творожный смузи", image: "curd_smoothie.png", ingredients: ["черника", "творог", "молоко", "мед", "мята"] },
    { name: "Кофейное орео", image: "coffee_oreo.png", ingredients: ["мята", "орео", "молоко", "кофе"] },
    { name: "Бабл-ти карамельный", image: "caramel_bubble_tea.png", ingredients: ["молоко", "вода", "тапиока", "черный чай (листовой)", "карамель"] },
    { name: "Бабл ти", image: "bubble_tea.png", ingredients: ["молоко", "вода", "тапиока", "черный чай (листовой)"] },
    { name: "Кофе с молоком", image: "coffee_milk.png", ingredients: ["молоко", "кофе"] },
    { name: "Мятный кофе", image: "mint_coffee.png", ingredients: ["молоко", "кофе", "мята"] },
    { name: "Медовый кофе", image: "honey_coffee.png", ingredients: ["молоко", "кофе", "мед"] },
    { name: "Карамельный кофе", image: "caramel_coffee.png", ingredients: ["молоко", "кофе", "карамель"] },
    { name: "Коричный кофе", image: "cinnamon_coffee.png", ingredients: ["молоко", "кофе", "корица"] },
    { name: "Татарский чай", image: "tatar_tea.png", ingredients: ["черный чай (листовой)", "вода", "молоко"] },
    { name: "Чай", image: "tea.png", ingredients: ["вода", "черный чай (листовой)"] },
    { name: "Какао с молоком", image: "cacao.png", ingredients: ["молоко", "какао-порошок"] },
    { name: "Какао на воде", image: "cacao_water.png", ingredients: ["вода", "какао-порошок"] },
    { name: "Молочный коктейль", image: "milkshake.png", ingredients: ["черника", "молоко"] },
    { name: "Новейший рецепт", image: "novy.png", ingredients: ["кофе", "творог"] },
    { name: "Китайское пиво", image: "pivo.png", ingredients: ["кофе", "вода", "черника", "молоко", "гранат", "щепотка шерсти", "яблоко", "хлеб", "какао-порошок", "корица", "финики", "творог", "мед", "мята", "орео", "тапиока", "черный чай (листовой)", "карамель"] },
    { name: "Вода", image: "voda.png", ingredients: ["вода"] },
    { name: "Мальчик водочки мне", image: "alc.png", ingredients: ["алкоголь"] },
    { name: "Мохито", image: "mojito.png", ingredients: ["алкоголь", "мята"] },
    { name: "Ёрш", image: "fu.png", ingredients: ["алкоголь", "кофе", "вода", "черника", "гранат", "щепотка шерсти", "яблоко", "молоко", "хлеб", "какао-порошок", "корица", "финики", "творог", "мед", "мята", "орео", "тапиока", "черный чай (листовой)", "карамель"] },
    { name: "Квас", image: "kvas.png", ingredients: ["хлеб", "вода"] },
    { name: "Любимый лимонад мыши", image: "limonade.png", ingredients: ["гранат", "вода"] },
    { name: "Кот", image: "kot.png", ingredients: ["гранат", "щепотка шерсти"] },
    { name: "ХЛЕБ", image: "hleb.png", ingredients: ["хлеб"] },
    { name: "Любимый", image: "sok.png", ingredients: ["гранат", "вода", "яблоко"] },
    { name: "Любимый", image: "sok.png", ingredients: ["черника", "вода", "яблоко"] },
    { name: "Любимый", image: "sok.png", ingredients: ["вода", "яблоко"] },
    { name: "Холодный кофи", image: "sok.png", ingredients: ["орео", "тапиока", "кофе", "молоко"] },
    { name: "Мятный чай", image: "sok.png", ingredients: ["вода", "чай черный (листовой)", "мята"] }
    
];

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
