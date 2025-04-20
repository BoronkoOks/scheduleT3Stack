import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient()

const users = [
    {
        email: "admin@oks.ru",
        role: "ADMIN"
    },
    {
        email: "abramov@oks.ru",
        role: "TEACHER"
    },
    {
        email: "altman@oks.ru",
        role: "TEACHER"
    },
    {
        email: "vaseeva@oks.ru",
        role: "TEACHER"
    },
    {
        email: "volchanina@oks.ru",
        role: "TEACHER"
    },
    {
        email: "galich@oks.ru",
        role: "TEACHER"
    },
    {
        email: "elizarov@oks.ru",
        role: "TEACHER"
    },
    {
        email: "okishev@oks.ru",
        role: "TEACHER"
    },
    {
        email: "tixonova@oks.ru",
        role: "TEACHER"
    },
    {
        email: "tsirkin@oks.ru",
        role: "TEACHER"
    },
    {
        email: "lol@oks.ru",
        role: "STUDENT"
    },
    {
        email: "kek@oks.ru",
        role: "STUDENT"
    }
]

const teachers = [
    {
        surname: "Абрамов",
        name: "Пётр",
        fathername: "Дмитриевич",
        email: "abramov@oks.ru"
    },
    {
        surname: "Альтман",
        name: "Евгений",
        fathername: "Анатольевич",
        email: "altman@oks.ru"
    },
    {
        surname: "Васеева",
        name: "Татьяна",
        fathername: "Валериевна",
        email: "vaseeva@oks.ru"
    },
    {
        surname: "Волчанина",
        name: "Мария",
        fathername: "Андреевна",
        email: "volchanina@oks.ru"
    },
    {
        surname: "Галич",
        name: "Юлия",
        fathername: "Геннадьевна",
        email: "galich@oks.ru"
    },
    {
        surname: "Гудков",
        name: "Юрий",
        fathername: "Александрович",
        email: null
    },
    {
        surname: "Елизаров",
        name: "Дмитрий",
        fathername: "Александрович",
        email: "elizarov@oks.ru"
    },
    {
        surname: "Исачкин",
        name: "Сергей",
        fathername: "Павлович",
        email: null
    },
    {
        surname: "Кораблёв",
        name: "Владимир",
        fathername: "Николаевич",
        email: null
    },
    {
        surname: "Лаврухин",
        name: "Андрей",
        fathername: "Александрович",
        email: null
    },
    {
        surname: "Малютин",
        name: "Андрей",
        fathername: "Геннадьевич",
        email: null
    },
    {
        surname: "Мусаткина",
        name: "Бэла",
        fathername: "Владимировна",
        email: null
    },
    {
        surname: "Окишев",
        name: "Андрей",
        fathername: "Сергеевич",
        email: "okishev@oks.ru"
    },
    {
        surname: "Павлова",
        name: "Ирина",
        fathername: "Владимировна",
        email: null
    },
    {
        surname: "Пашкова",
        name: "Наталья",
        fathername: "Викторовна",
        email: null
    },
    {
        surname: "Печеневская",
        name: "Наталья",
        fathername: "Геннадьевна",
        email: null
    },
    {
        surname: "Пономарёв",
        name: "Антон",
        fathername: "Витальевич",
        email: null
    },
    {
        surname: "Сердюк",
        name: "Владимир",
        fathername: "Александрович",
        email: null
    },
    {
        surname: "Слижевская",
        name: "Анастасия",
        fathername: "Николаевна",
        email: null
    },
    {
        surname: "Смалев",
        name: "Александр",
        fathername: "Николаевич",
        email: null
    },
    {
        surname: "Тихонова",
        name: "Наталья",
        fathername: "Елексеевна",
        email: "tixonova@oks.ru"
    },
    {
        surname: "Тодер",
        name: "Георгий",
        fathername: "Борисович",
        email: null
    },
    {
        surname: "Фесенко",
        name: "Ольга",
        fathername: "Петровна",
        email: null
    },
    {
        surname: "Хмырова",
        name: "Наталья",
        fathername: "Анатольевна",
        email: null
    },
    {
        surname: "Циркин",
        name: "Виталий",
        fathername: "Степанович",
        email: "tsirkin@oks.ru"
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
    },
    {
        name: "Статистика",
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

const specialtyDiscs = [
    {
        speciality: "Информатика и вычислительная техника",
        discipline: "Иностранный язык"
    },
    {
        speciality: "Информационные системы и технологии",
        discipline: "Иностранный язык"
    },
    {
        speciality: "Бизнес-информатика",
        discipline: "Иностранный язык"
    },
    {
        speciality: "Информатика и вычислительная техника",
        discipline: "Информатика"
    },
    {
        speciality: "Информационные системы и технологии",
        discipline: "Информатика"
    },
    {
        speciality: "Бизнес-информатика",
        discipline: "Информатика"
    },
    {
        speciality: "Информатика и вычислительная техника",
        discipline: "Проектирование информационных систем и баз данных"
    },
    {
        speciality: "Информационные системы и технологии",
        discipline: "Проектирование информационных систем и баз данных"
    },
    {
        speciality: "Бизнес-информатика",
        discipline: "Экономика и управление проектами"
    },
    {
        speciality: "Информатика и вычислительная техника",
        discipline: "Электроника и схемотехника"
    },
    {
        speciality: "Информационные системы и технологии",
        discipline: "Электроника и схемотехника"
    },
    {
        speciality: "Бизнес-информатика",
        discipline: "Статистика"
    },
]

const classrooms = [
    {
        name: "1-322",
        seats: 6,
        projector: false,
        computers: 10
    },
    {
        name: "1-325",
        seats: 0,
        projector: true,
        computers: 10
    },
    {
        name: "1-326",
        seats: 24,
        projector: true,
        computers: 12
    },
    {
        name: "1-330",
        seats: 30,
        projector: true,
        computers: 16
    },
    {
        name: "1-320",
        seats: 100,
        projector: true,
        computers: 0
    },
    {
        name: "1-220",
        seats: 100,
        projector: true,
        computers: 0
    },
    {
        name: "1-467",
        seats: 30,
        projector: false,
        computers: 14
    },
    {
        name: "спортзал",
        seats: 0,
        projector: false,
        computers: 0
    },
    {
        name: "1-160",
        seats: 100,
        projector: true,
        computers: 0
    },
    {
        name: "1-112",
        seats: 50,
        projector: true,
        computers: 0
    },
    {
        name: "1-471",
        seats: 50,
        projector: true,
        computers: 0
    },
    {
        name: "1-420",
        seats: 100,
        projector: true,
        computers: 0
    },
]

const groups = [
    {
        name: "22з",
        year: 2022,
        students: 19,
        speciality: "Информационные системы и технологии"
    },
    {
        name: "22к",
        year: 2022,
        students: 9,
        speciality: "Информационные системы и технологии"
    },
    {
        name: "22м",
        year: 2022,
        students: 10,
        speciality: "Информатика и вычислительная техника"
    },
    {
        name: "22ф",
        year: 2022,
        students: 5,
        speciality: "Бизнес-информатика"
    },
    {
        name: "23з",
        year: 2023,
        students: 20,
        speciality: "Информационные системы и технологии"
    },
    {
        name: "21з",
        year: 2021,
        students: 15,
        speciality: "Информационные системы и технологии"
    },
    {
        name: "24р",
        year: 2024,
        students: 12,
        speciality: "Реклама и связи с общественностью"
    },
    {
        name: "23и",
        year: 2023,
        students: 23,
        speciality: "Инноватика"
    },
    {
        name: "21т",
        year: 2021,
        students: 10,
        speciality: "Туризм"
    },
    {
        name: "24э",
        year: 2024,
        students: 24,
        speciality: "Экономика"
    },
]


async function main() {
    await prisma.teacher.deleteMany()
    await prisma.user.deleteMany()
    await prisma.specialityDisc.deleteMany()
    await prisma.discipline.deleteMany()
    await prisma.group.deleteMany()
    await prisma.speciality.deleteMany()
    await prisma.classroom.deleteMany()

    await Promise.all(
        users.map(async (user) => {
            await prisma.user.create({
                data: {
                    email: user.email,
                    role: user.role as Role
                }
            })
        })
    )

    await Promise.all(
        teachers.map(async (teacher) => {

            const user = await prisma.user.findUnique({
                where: {
                    email: teacher.email || ""
                }
            })

            await prisma.teacher.create({
                data: {
                    surname: teacher.surname,
                    name: teacher.name,
                    fathername: teacher.fathername,
                    userId: user?.id
                }
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

    await Promise.all(
        specialtyDiscs.map(async (sd) => {
            const specialityId = await prisma.speciality.findFirstOrThrow(
                {
                    where: {name: sd.speciality},
                    select: {id: true}
                }
            )

            const disciplineId = await prisma.discipline.findFirstOrThrow(
                {
                    where: {name: sd.discipline},
                    select: {id: true}
                }
            )

            await prisma.specialityDisc.create({
                data: {
                    specialityId: specialityId.id,
                    disciplineId: disciplineId.id
                }
            })
        })
    )

    await Promise.all(
        classrooms.map(async (classroom) => {
            await prisma.classroom.create({
                data: classroom
            })
        })
    )

    await Promise.all(
        groups.map(async (g) => {
            const specialityId = await prisma.speciality.findFirstOrThrow(
                {
                    where: {name: g.speciality},
                    select: {id: true}
                }
            )

            await prisma.group.create({
                data: {
                    name: g.name,
                    year: g.year,
                    students: g.students,
                    specialityId: specialityId.id
                }
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
