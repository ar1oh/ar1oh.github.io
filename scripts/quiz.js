const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 3),
	new Result("Ваш уровень выше среднего", 6),
	new Result("Вы в совершенстве знаете тему", 9)
];

//Массив с вопросами
const questions = 
[
	new Question("Какое количество сообщений будет выведено в консоль? <br/> for(var i = 10; i < 35; i += 5) {<br/> console.log(i); <br/>}",
	[
		new Answer("25", 0),
		new Answer("Такой цикл не будет работать", 0),
		new Answer("6", 0),
		new Answer("15", 0),
        new Answer("5", 1)
	]),

	new Question("Какие значения можно хранить в переменных?", 
	[
		new Answer("Только числа и строки", 0),
		new Answer("Строки, числа с точкой и простые числа", 0),
		new Answer("Строки, числа с точкой, простые числа и булевые выражения", 1),
	]),

	new Question("Какие циклы есть в языке JavaScript?", 
	[
		new Answer("for, forMap, foreach, while", 0),
		new Answer("for, forMap, foreach, while, do while", 0),
		new Answer("for, while, do while, foreach", 0),
		new Answer("for, while, do while", 1)
	]),

	new Question("Где верно указан вывод данных?", 
	[
		new Answer("documentWrite('Hello');", 0),
		new Answer("print(Hello);", 0),
		new Answer("prompt('Hello')", 0),
		new Answer("write('Hello');", 0),
        new Answer("console.log('Hello');", 1)
	]),

	new Question("Что такое условный оператор?", 
	[
		new Answer("Конструкция, что выполняет код несколько раз", 0),
		new Answer("Конструкция для создания определенной переменной", 0),
		new Answer("Оператор сравнения значений", 1),
	]),

	new Question("Где можно использовать JavaScript?", 
	[
		new Answer("Мобильные приложения", 0),
		new Answer("Веб-приложения", 0),
		new Answer("Серверные приложения", 0),
		new Answer("Прикладное программное обеспечение", 0),
        new Answer("Можно во всех перечисленных", 1),
	]),

    new Question("Где верно указано имя переменной?", 
	[
		new Answer("var 2num;", 0),
		new Answer("ver num;", 0),
		new Answer("var num", 0),
		new Answer("var num-1;", 0),
        new Answer("var num_1;", 1),
	]),

    new Question("Где верно указан запуск всплывающего окна?", 
	[
		new Answer("new alert ('Hi')", 0),
		new Answer("info ('Hi')", 0),
		new Answer("Нет верных вариантов", 0),
		new Answer("alert ('Hi')", 1),
	]),

    new Question("Какая переменная записана неверно?", 
	[
		new Answer("var num = 'STRING';", 0),
		new Answer("var isDone = 0;", 0),
		new Answer("var b = false;", 0),
		new Answer("var number = 12,5;", 1),
	]),

    new Question("В чем разница между confirm и prompt?", 
	[
		new Answer("Они ничем не отличаются", 0),
		new Answer("confirm вызывает диалоговое окно с полем для ввода, prompt - окно с подтверждением", 0),
		new Answer("prompt вызывает диалоговое окно с полем для ввода, confirm - окно с подтверждением", 1),
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}