
/* 
    Это задание выполняйте в новом репозитории
    TASK 4 (Практика по словарику)

    1. Реализовать тот функционал словарика что был на уроке
    2. Добавить кнопку удаления в каждой строке словарика, напротив каждой пары "слово-перевод"
    3. По нажатию на кнопку удаления - необходимо удалять эту строку, и эту пару "слово-перевод"
    4. Так же при удалении пары из самой таблицы, необходимо конечно же изменять localstorage и массив с объектами слов
    
    Подсказка: чтобы поймать индекс каждого row в таблице, в js есть метод rowIndex
*/

const englishInput = document.getElementById('input-eng'),
      russianInput = document.getElementById('input-rus'),
      inputs = document.querySelectorAll('input'),
      saveButton = document.getElementById('btn'),
      table = document.getElementById('table');

let words;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));
const addWordToTable = index => {
    table.innerHTML += `
    <tr>
        <td>${words[index].translate}</td>
        <td>${words[index].russian}</td>
        <td><button id="btn-delete">Удалить</button></td>
    </tr>
    `
}

words.forEach((item, index) => {
    addWordToTable(index);
});

class createWord {
    constructor(translate, russian) {
        this.translate = translate;
        this.russian = russian;
    }
}

saveButton.addEventListener('click', () => {
    if(
        englishInput.value.length < 1 ||
        russianInput.value.length < 1 ||
        !isNaN(englishInput.value)    ||
        !isNaN(russianInput.value)
    ) {
        for(let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for(let key of inputs) {
            key.classList.remove('error');
        }
        words.push(new createWord(englishInput.value, russianInput.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        deleteWords();
        englishInput.value = '';
        russianInput.value = '';
    }
})

const deleteWords = () => {
    let deleteBtns = table.querySelectorAll('#btn-delete');
    deleteBtns.forEach((deleteBtn, index) => {
        deleteBtn.addEventListener('click',() => {
            words.splice(index, 1);
            table.innerHTML = '';
            words.forEach((item, index) => {
                addWordToTable(index)
            });
            deleteWords();
            localStorage.setItem('words', JSON.stringify(words));
        })
    })
}

deleteWords();