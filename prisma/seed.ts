import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const teachers = [
    {
        surname: "Абрамов",
        name: "Пётр",
        fathername: "Дмитриевич"
    },
    {
        surname: "Альтман",
        name: "Евгений",
        fathername: "Анатольевич"
    },
    {
        surname: "Васеева",
        name: "Татьяна",
        fathername: "Валериевна"
    },
    {
        surname: "Волчанина",
        name: "Мария",
        fathername: "Андреевна"
    },
    {
        surname: "Галич",
        name: "Юлия",
        fathername: "Геннадьевна"
    },
    {
        surname: "Гудков",
        name: "Юрий",
        fathername: "Александрович"
    },
    {
        surname: "Елизаров",
        name: "Дмитрий",
        fathername: "Александрович"
    },
    {
        surname: "Исачкин",
        name: "Сергей",
        fathername: "Павлович"
    },
    {
        surname: "Кораблёв",
        name: "Владимир",
        fathername: "Николаевич"
    },
    {
        surname: "Лаврухин",
        name: "Андрей",
        fathername: "Александрович"
    },
    {
        surname: "Малютин",
        name: "Андрей",
        fathername: "Геннадьевич"
    },
    {
        surname: "Мусаткина",
        name: "Бэла",
        fathername: "Владимировна"
    },
    {
        surname: "Окишев",
        name: "Андрей",
        fathername: "Сергеевич"
    },
    {
        surname: "Павлова",
        name: "Ирина",
        fathername: "Владимировна"
    },
    {
        surname: "Пашкова",
        name: "Наталья",
        fathername: "Викторовна"
    },
    {
        surname: "Печеневская",
        name: "Наталья",
        fathername: "Геннадьевна"
    },
    {
        surname: "Пономарёв",
        name: "Антон",
        fathername: "Витальевич"
    },
    {
        surname: "Сердюк",
        name: "Владимир",
        fathername: "Александрович"
    },
    {
        surname: "Слижевская",
        name: "Анастасия",
        fathername: "Николаевна"
    },
    {
        surname: "Смалев",
        name: "Александр",
        fathername: "Николаевич"
    },
    {
        surname: "Тихонова",
        name: "Наталья",
        fathername: "Елексеевна"
    },
    {
        surname: "Тодер",
        name: "Георгий",
        fathername: "Борисович"
    },
    {
        surname: "Фесенко",
        name: "Ольга",
        fathername: "Петровна"
    },
    {
        surname: "Хмырова",
        name: "Наталья",
        fathername: "Анатольевна"
    },
    {
        surname: "Циркин",
        name: "Виталий",
        fathername: "Степанович"
    }
]

const disciplines = [
    {
        name: "Иностранный язык",
        semesters: 4,
        subgroups: true
    },
    {
        name: "Информатика",
        semesters: 1,
        subgroups: true
    },
    {
        name: "История",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Культурология",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Основы информационной культуры",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Практическая техника безопасности",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Программирование",
        semesters: 4,
        subgroups: true
    },
    {
        name: "Русский язык и деловые коммуникации",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Физика",
        semesters: 3,
        subgroups: true
    },
    {
        name: "Элективные дисциплины по физической культуре и спорту",
        semesters: 4,
        subgroups: false
    },
    {
        name: "Конфликтология",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Музей в системе профессиональной культуры",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Философия",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Безопасность жизнедеятельности",
        semesters: 2,
        subgroups: false
    },
    {
        name: "Объектно-ориентированное программирование",
        semesters: 2,
        subgroups: true
    },
    {
        name: "Правоведение",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Теоретические основы аппаратно-программных средств",
        semesters: 2,
        subgroups: true
    },
    {
        name: "Проектирование информационных систем и баз данных",
        semesters: 2,
        subgroups: true
    },
    {
        name: "Экономика и управление проектами",
        semesters: 1,
        subgroups: false
    },
    {
        name: "Электроника и схемотехника",
        semesters: 2,
        subgroups: true
    },
    {
        name: "Электротехника и метрология",
        semesters: 1,
        subgroups: true
    },
    {
        name: "Инфокоммуникационные системы и сети",
        semesters: 2,
        subgroups: true
    },
    {
        name: "Компьютерные комплексы и сети",
        semesters: 2,
        subgroups: true
    },
    {
        name: "Основы теории управления",
        semesters: 1,
        subgroups: true
    },
    {
        name: "Прикладное программирование",
        semesters: 2,
        subgroups: false
    },
    {
        name: "Теория автоматического управления",
        semesters: 1,
        subgroups: true
    },
    {
        name: "Тестирование программных продуктов",
        semesters: 2,
        subgroups: true
    },
    {
        name: "Инженерия информационных систем",
        semesters: 2,
        subgroups: true
    },
    {
        name: "Физическая культура и спорт",
        semesters: 1,
        subgroups: false
    }
]

const specialities = [
    {
        name: "Подвижной состав железных дорог",
        code: "23.05.03",
        years: 5
    },
    {
        name: "Информатика и вычислительная техника",
        code: "09.03.01",
        years: 4
    },
    {
        name: "Информационные системы и технологии",
        code: "09.03.02",
        years: 4
    },
    {
        name: "Инфокоммуникационные технологии и системы связи",
        code: "11.03.02",
        years: 4
    },
    {
        name: "Приборостроение",
        code: "12.03.01",
        years: 4
    },
    {
        name: "Теплоэнергетика и теплотехника",
        code: "13.03.01",
        years: 4
    },
    {
        name: "Электроэнергетика и электротехника",
        code: "13.03.02",
        years: 4
    },
    {
        name: "Конструкторско-технологическое обеспечение машиностроительных производств",
        code: "15.03.05",
        years: 4
    },
    {
        name: "Мехатроника и робототехника",
        code: "15.03.06",
        years: 4
    },
    {
        name: "Технология транспортных процессов",
        code: "23.03.01",
        years: 4
    },
    {
        name: "Наземные транспортно-технологические комплексы",
        code: "23.03.02",
        years: 4
    },
    {
        name: "Стандартизация и метрология",
        code: "27.03.01",
        years: 4
    },
    {
        name: "Управление качеством",
        code: "27.03.02",
        years: 4
    },
    {
        name: "Управление в технических системах",
        code: "27.03.04",
        years: 4
    },
    {
        name: "Инноватика",
        code: "27.03.05",
        years: 4
    },
    {
        name: "Экономика",
        code: "38.03.01",
        years: 4
    },
    {
        name: "Менеджмент",
        code: "38.03.02",
        years: 4
    },
    {
        name: "Бизнес-информатика",
        code: "38.03.05",
        years: 4
    },
    {
        name: "Торговое дело",
        code: "38.03.06",
        years: 4
    },
    {
        name: "Жилищное хозяйство и коммунальная инфраструктура",
        code: "38.03.10",
        years: 4
    },
    {
        name: "Реклама и связи с общественностью",
        code: "42.03.01",
        years: 4
    },
    {
        name: "Журналистика",
        code: "42.03.02",
        years: 4
    },
    {
        name: "Туризм",
        code: "43.03.02",
        years: 4
    }
]

// const users = [
//   {
//     email: "ian@example.com",
//     surname: "Ян",
//     surname: "Непомнящий",
//     group: "Группа 1",
//   },
//   {
//     email: "vlad@example.com",
//     surname: "Владислав",
//     surname: "Артемьев",
//     group: "Группа 1",
//   },
//   {
//     email: "dan@example.com",
//     surname: "Даниил",
//     surname: "Дубов",
//     group: "Группа 1",
//   },
//   {
//     email: "sash@example.com",
//     surname: "Александр",
//     surname: "Грищук",
//     group: "Группа 1",
//     subgroup: 2,
//   },
//   {
//     email: "ern@example.com",
//     surname: "Эрнесто",
//     surname: "Инаркиев",
//     group: "Группа 2",
//   },
// ];

// const groups = [
//   {
//     name: "Группа 1",
//   },
//   {
//     name: "Группа 2",
//   },
//   {
//     name: "Группа 3",
//   },
//   {
//     name: "Группа 4",
//   },
//   {
//     name: "Группа 5",
//   },
// ];

// const taskTypes = [
//   { name: "Лекция" },
//   { name: "Лабораторное занятие" },
//   { name: "Лабораторная работа" },
// ];

// const tasks = [
//   "Лекция. Введение",
//   "Лекция. Среда разработки",
//   "Лекция. Время и пространство",
// ];

// const squads = [
//   {
//     tutor: "Дубов",
//     students: [
//       ["Грищук", 2],
//       ["Дубов", 3],
//       ["Непомнящий", null],
//     ],
//   },
//   {
//     tutor: "Грищук",
//     students: [
//       ["Инаркиев", 2],
//       ["Дубов", 3],
//       ["Непомнящий", null],
//     ],
//   },
// ];


async function main() {
    await prisma.teacher.deleteMany()
    await prisma.discipline.deleteMany()
    await prisma.speciality.deleteMany()

    await Promise.all(
        teachers.map(async (teacher) => {
            await prisma.teacher.create({
                data: teacher
            })
        })
    )

    await Promise.all(
        disciplines.map(async (discipline) => {
            await prisma.discipline.create({
                data: discipline
            })
        })
    )

    await Promise.all(
        specialities.map(async (speciality) => {
            await prisma.speciality.create({
                data: speciality
            })
        })
    )
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
