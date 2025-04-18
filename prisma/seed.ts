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

    await Promise.all(
        teachers.map(async (teacher) => {
            await prisma.teacher.create({
                data: teacher
                // surname: teacher.surname,
                // name: teacher.name,
                // fathername: teacher.fathername
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
