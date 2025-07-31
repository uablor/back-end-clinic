import { Injectable } from '@nestjs/common';
import { DistrictEntity } from 'src/infrastructure/typeorm/district.orm-entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class DistrictsSeeder {
    constructor() { }

    async seed(manager: EntityManager) {
        const _respository = manager.getRepository(DistrictEntity);
        const items = [
            {
                "id": 101,
                "name": "ຈັນທະບູລີ",
                "name_en": "Chanthabuly",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 102,
                "name": "ສີໂຄດຕະບອງ",
                "name_en": "Sikhottabong",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 103,
                "name": "ໄຊເສດຖາ",
                "name_en": "Xaysetha",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 104,
                "name": "ສີສັດຕະນາກ",
                "name_en": "Sisattanak",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 105,
                "name": "ນາຊາຍທອງ",
                "name_en": "Naxaithong",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 106,
                "name": "ໄຊທານີ",
                "name_en": "Xaythany",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 107,
                "name": "ຫາດຊາຍຟອງ",
                "name_en": "Hadxaifong",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 108,
                "name": "ສັງທອງ",
                "name_en": "Sangthong",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 109,
                "name": "ປາກງື່ມ",
                "name_en": "Parkngum",
                "province": {
                    "id": 1
                }
            },
            {
                "id": 201,
                "name": "ຜົ້ງສາລີ",
                "name_en": "Phongsaly",
                "province": {
                    "id": 2
                }
            },
            {
                "id": 202,
                "name": "ໃຫມ່",
                "name_en": "May",
                "province": {
                    "id": 2
                }
            },
            {
                "id": 203,
                "name": "ຂວາ",
                "name_en": "Khua",
                "province": {
                    "id": 2
                }
            },
            {
                "id": 204,
                "name": "ສຳພັນ",
                "name_en": "Samphanh",
                "province": {
                    "id": 2
                }
            },
            {
                "id": 205,
                "name": "ບູນເຫນືອ",
                "name_en": "Bounneua",
                "province": {
                    "id": 2
                }
            },
            {
                "id": 206,
                "name": "ຍອດອູ",
                "name_en": "Nhot ou",
                "province": {
                    "id": 2
                }
            },
            {
                "id": 207,
                "name": "ບູນໃຕ້",
                "name_en": "Boontai",
                "province": {
                    "id": 2
                }
            },
            {
                "id": 301,
                "name": "ຫລວງນ້ຳທາ",
                "name_en": "Luangnamtha",
                "province": {
                    "id": 3
                }
            },
            {
                "id": 302,
                "name": "ສິງ",
                "name_en": "Sing",
                "province": {
                    "id": 3
                }
            },
            {
                "id": 303,
                "name": "ລອງ",
                "name_en": "Long",
                "province": {
                    "id": 3
                }
            },
            {
                "id": 304,
                "name": "ວຽງພູຄາ",
                "name_en": "Viengphoukha",
                "province": {
                    "id": 3
                }
            },
            {
                "id": 305,
                "name": "ນາແລ",
                "name_en": "Nalae",
                "province": {
                    "id": 3
                }
            },
            {
                "id": 401,
                "name": "ໄຊ",
                "name_en": "Xay",
                "province": {
                    "id": 4
                }
            },
            {
                "id": 402,
                "name": "ຫລາ",
                "name_en": "La",
                "province": {
                    "id": 4
                }
            },
            {
                "id": 403,
                "name": "ນາໝໍ້ ",
                "name_en": "Namor",
                "province": {
                    "id": 4
                }
            },
            {
                "id": 404,
                "name": "ງາ",
                "name_en": "Nga",
                "province": {
                    "id": 4
                }
            },
            {
                "id": 405,
                "name": "ແບງ",
                "name_en": "Beng",
                "province": {
                    "id": 4
                }
            },
            {
                "id": 406,
                "name": "ຮຸນ",
                "name_en": "Hoon",
                "province": {
                    "id": 4
                }
            },
            {
                "id": 407,
                "name": "ປາກແບງ",
                "name_en": "Pakbeng",
                "province": {
                    "id": 4
                }
            },
            {
                "id": 501,
                "name": "ຫ້ວຍຊາຍ",
                "name_en": "Houixay",
                "province": {
                    "id": 5
                }
            },
            {
                "id": 502,
                "name": "ຕົ້ນເຜິ້ງ",
                "name_en": "Tongpheung",
                "province": {
                    "id": 5
                }
            },
            {
                "id": 503,
                "name": "ເມິງ",
                "name_en": "Meung",
                "province": {
                    "id": 5
                }
            },
            {
                "id": 504,
                "name": "ຜາອຸດົມ",
                "name_en": "Phaoudom",
                "province": {
                    "id": 5
                }
            },
            {
                "id": 505,
                "name": "ປາກທາ",
                "name_en": "Paktha",
                "province": {
                    "id": 5
                }
            },
            {
                "id": 601,
                "name": "ຫຼວງພະບາງ",
                "name_en": "Luangprabang",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 602,
                "name": "ຊຽງເງິນ",
                "name_en": "Xiengngeun",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 603,
                "name": "ນານ",
                "name_en": "Nan",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 604,
                "name": "ປາກອູ",
                "name_en": "Parkou",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 605,
                "name": "ນ້ຳບາກ",
                "name_en": "Nambak",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 606,
                "name": "ງອຍ",
                "name_en": "Ngoi",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 607,
                "name": "ປາກແຊງ",
                "name_en": "Pakxeng",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 608,
                "name": "ໂພນໄຊ",
                "name_en": "Phonxay",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 609,
                "name": "ຈອມເພັດ",
                "name_en": "Chomphet",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 610,
                "name": "ວຽງຄຳ",
                "name_en": "Viengkham",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 611,
                "name": "ພູຄູນ",
                "name_en": "Phoukhoune",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 612,
                "name": "ໂພນທອງ",
                "name_en": "Phonthong",
                "province": {
                    "id": 6
                }
            },
            {
                "id": 701,
                "name": "ຊຳເໜືອ",
                "name_en": "Xamneua",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 702,
                "name": "ຊຽງຄໍ້",
                "name_en": "Xiengkhor",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 703,
                "name": "ຮ້ຽມ",
                "name_en": "Hiam",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 704,
                "name": "ວຽງໄຊ",
                "name_en": "Viengxay",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 705,
                "name": "ຫົວເມືອງ",
                "name_en": "Huameuang",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 706,
                "name": "ຊຳໃຕ້",
                "name_en": "Xamtay",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 707,
                "name": "ສົບເບົາ",
                "name_en": "Sopbao",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 708,
                "name": "ແອດ",
                "name_en": "Add",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 709,
                "name": "ກວັນ",
                "name_en": "Kuan",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 710,
                "name": "ຊອນ",
                "name_en": "Xone",
                "province": {
                    "id": 7
                }
            },
            {
                "id": 801,
                "name": "ໄຊຍະບູລີ",
                "name_en": "Xayabury",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 802,
                "name": "ຄອບ",
                "name_en": "Khop",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 803,
                "name": "ຫົງສາ",
                "name_en": "Hongsa",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 804,
                "name": "ເງິນ",
                "name_en": "Ngeun",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 805,
                "name": "ຊຽງຮ່ອນ",
                "name_en": "Xienghone",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 806,
                "name": "ພຽງ",
                "name_en": "Phieng",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 807,
                "name": "ປາກລາຍ",
                "name_en": "Parklai",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 808,
                "name": "ແກ່ນທ້າວ",
                "name_en": "Kenethao",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 809,
                "name": "ບໍ່ແຕນ",
                "name_en": "Botene",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 810,
                "name": "ທົ່ງມີໄຊ",
                "name_en": "Thongmyxay",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 811,
                "name": "ໄຊຊະຖານ",
                "name_en": "Xaysathan",
                "province": {
                    "id": 8
                }
            },
            {
                "id": 901,
                "name": "ແປກ",
                "name_en": "Pek",
                "province": {
                    "id": 9
                }
            },
            {
                "id": 902,
                "name": "ຄຳ",
                "name_en": "Kham",
                "province": {
                    "id": 9
                }
            },
            {
                "id": 903,
                "name": "ໜອງແຮດ",
                "name_en": "Nonghed",
                "province": {
                    "id": 9
                }
            },
            {
                "id": 904,
                "name": "ຄູນ",
                "name_en": "Khoune",
                "province": {
                    "id": 9
                }
            },
            {
                "id": 905,
                "name": "ໝອກ",
                "name_en": "Mork",
                "province": {
                    "id": 9
                }
            },
            {
                "id": 906,
                "name": "ພູກູດ",
                "name_en": "Phookood",
                "province": {
                    "id": 9
                }
            },
            {
                "id": 907,
                "name": "ຜາໄຊ",
                "name_en": "Phaxay",
                "province": {
                    "id": 9
                }
            },
            {
                "id": 1001,
                "name": "ໂພນໂຮງ",
                "name_en": "Phonhong",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1002,
                "name": "ທຸລະຄົມ",
                "name_en": "Thoulakhom",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1003,
                "name": "ແກ້ວອຸດົມ",
                "name_en": "Keooudom",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1004,
                "name": "ກາສີ",
                "name_en": "Kasy",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1005,
                "name": "ວັງວຽງ",
                "name_en": "Vangvieng",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1006,
                "name": "ເຟືອງ",
                "name_en": "Feuang",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1007,
                "name": "ຊະນະຄາມ",
                "name_en": "Xanakham",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1008,
                "name": "ແມດ",
                "name_en": "Mad",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1009,
                "name": "ວຽງຄຳ",
                "name_en": "Viengkham",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1010,
                "name": "ຫີນເຫີບ",
                "name_en": "Hinherb",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1012,
                "name": "ໝື່ນ",
                "name_en": "Meun",
                "province": {
                    "id": 10
                }
            },
            {
                "id": 1101,
                "name": "ປາກຊັນ",
                "name_en": "Pakxane",
                "province": {
                    "id": 11
                }
            },
            {
                "id": 1102,
                "name": "ທ່າພະບາດ",
                "name_en": "Thaphabath",
                "province": {
                    "id": 11
                }
            },
            {
                "id": 1103,
                "name": "ປາກກະດິງ",
                "name_en": "Pakkading",
                "province": {
                    "id": 11
                }
            },
            {
                "id": 1104,
                "name": "ບໍລິຄັນ",
                "name_en": "Bolikhanh",
                "province": {
                    "id": 11
                }
            },
            {
                "id": 1105,
                "name": "ຄຳເກີດ",
                "name_en": "Khamkheuth",
                "province": {
                    "id": 11
                }
            },
            {
                "id": 1106,
                "name": "ວຽງທອງ",
                "name_en": "Viengthong",
                "province": {
                    "id": 11
                }
            },
            {
                "id": 1107,
                "name": "ໄຊຈຳພອນ",
                "name_en": "Xaychamphone",
                "province": {
                    "id": 11
                }
            },
            {
                "id": 1201,
                "name": "ທ່າແຂກ",
                "name_en": "Thakhek",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1202,
                "name": "ມະຫາໄຊ",
                "name_en": "Mahaxay",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1203,
                "name": "ໜອງບົກ",
                "name_en": "Nongbok",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1204,
                "name": "ຫີນບູນ",
                "name_en": "Hinboon",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1205,
                "name": "ຍົມມະລາດ",
                "name_en": "Nhommalath",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1206,
                "name": "ບົວລະພາ",
                "name_en": "Bualapha",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1207,
                "name": "ນາກາຍ",
                "name_en": "Nakai",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1208,
                "name": "ເຊບັ້ງໄຟ",
                "name_en": "Xebangfay",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1209,
                "name": "ໄຊບົວທອງ",
                "name_en": "Xaybuathong",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1210,
                "name": "ຄູນຄຳ",
                "name_en": "Khounkham",
                "province": {
                    "id": 12
                }
            },
            {
                "id": 1301,
                "name": "ໄກສອນ ພົມວິຫານ",
                "name_en": "Kaisone Phomvihane",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1302,
                "name": "ອຸທຸມພອນ",
                "name_en": "Outhoumphone",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1303,
                "name": "ອາດສະພັງທອງ",
                "name_en": "Atsaphangthong",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1304,
                "name": "ພີນ",
                "name_en": "Phine",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1305,
                "name": "ເຊໂປນ",
                "name_en": "Xepon",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1306,
                "name": "ນອງ",
                "name_en": "Nong",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1307,
                "name": "ທ່າປາງທອງ",
                "name_en": "Thapangthong",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1308,
                "name": "ສອງຄອນ",
                "name_en": "Songkhone",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1309,
                "name": "ຈຳພອນ",
                "name_en": "Champhone",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1310,
                "name": "ຊົນບູລີ",
                "name_en": "Xonbuly",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1311,
                "name": "ໄຊບູລີ",
                "name_en": "Xaybouly",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1312,
                "name": "ວິລະບູລີ",
                "name_en": "Vilabuly",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1313,
                "name": "ອາດສະພອນ",
                "name_en": "Atsaphone",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1314,
                "name": "ໄຊພູທອງ",
                "name_en": "Xayphoothong",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1315,
                "name": "ພະລານໄຊ",
                "name_en": "Phalanxay",
                "province": {
                    "id": 13
                }
            },
            {
                "id": 1401,
                "name": "ສາລະວັນ",
                "name_en": "Saravane",
                "province": {
                    "id": 14
                }
            },
            {
                "id": 1402,
                "name": "ຕາໂອ້ຍ",
                "name_en": "Ta oi",
                "province": {
                    "id": 14
                }
            },
            {
                "id": 1403,
                "name": "ຕຸ້ມລານ",
                "name_en": "Toomlam",
                "province": {
                    "id": 14
                }
            },
            {
                "id": 1404,
                "name": "ລະຄອນເພັງ",
                "name_en": "Lakhonepheng",
                "province": {
                    "id": 14
                }
            },
            {
                "id": 1405,
                "name": "ວາປີ",
                "name_en": "Vapy",
                "province": {
                    "id": 14
                }
            },
            {
                "id": 1406,
                "name": "ຄົງເຊໂດນ",
                "name_en": "Kongxedone",
                "province": {
                    "id": 14
                }
            },
            {
                "id": 1407,
                "name": "ເລົ່າງາມ",
                "name_en": "Lao ngarm",
                "province": {
                    "id": 14
                }
            },
            {
                "id": 1408,
                "name": "ສະມ້ວຍ",
                "name_en": "Samoi",
                "province": {
                    "id": 14
                }
            },
            {
                "id": 1501,
                "name": "ລະມາມ",
                "name_en": "Lamarm",
                "province": {
                    "id": 15
                }
            },
            {
                "id": 1502,
                "name": "ກະລືມ",
                "name_en": "Kaleum",
                "province": {
                    "id": 15
                }
            },
            {
                "id": 1503,
                "name": "ດາກຈຶງ",
                "name_en": "Dakcheung",
                "province": {
                    "id": 15
                }
            },
            {
                "id": 1504,
                "name": "ທ່າແຕງ",
                "name_en": "Thateng",
                "province": {
                    "id": 15
                }
            },
            {
                "id": 1601,
                "name": "ປາກເຊ",
                "name_en": "Pakse",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1602,
                "name": "ຊະນະສົມບູນ",
                "name_en": "Sanasomboon",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1603,
                "name": "ບາຈຽງຈະເລີນສຸກ",
                "name_en": "Bachiangchaleunsook",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1604,
                "name": "ປາກຊ່ອງ",
                "name_en": "Pakxong",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1605,
                "name": "ປະທຸມພອນ",
                "name_en": "Pathoumphone",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1606,
                "name": "ໂພນທອງ",
                "name_en": "Phonthong",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1607,
                "name": "ຈຳປາສັກ",
                "name_en": "Champasak",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1608,
                "name": "ສຸຂຸມາ",
                "name_en": "Sukhuma",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1609,
                "name": "ມຸນລະປະໂມກ",
                "name_en": "Moonlapamok",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1610,
                "name": "ໂຂງ",
                "name_en": "Khong",
                "province": {
                    "id": 16
                }
            },
            {
                "id": 1701,
                "name": "ໄຊເສດຖາ",
                "name_en": "Xaysettha",
                "province": {
                    "id": 17
                }
            },
            {
                "id": 1702,
                "name": "ສາມະຄີໄຊ",
                "name_en": "Samakkixay",
                "province": {
                    "id": 17
                }
            },
            {
                "id": 1703,
                "name": "ສະໜາມໄຊ",
                "name_en": "Sanamxay",
                "province": {
                    "id": 17
                }
            },
            {
                "id": 1704,
                "name": "ສານໄຊ",
                "name_en": "Sanxay",
                "province": {
                    "id": 17
                }
            },
            {
                "id": 1705,
                "name": "ພູວົງ",
                "name_en": "Phouvong",
                "province": {
                    "id": 17
                }
            },
            {
                "id": 1801,
                "name": "ອານຸວົງ",
                "name_en": "Anouvong",
                "province": {
                    "id": 18
                }
            },
            {
                "id": 1802,
                "name": "ທ່າໂທມ",
                "name_en": "Thathom",
                "province": {
                    "id": 18
                }
            },
            {
                "id": 1803,
                "name": "ລ້ອງແຈ້ງ",
                "name_en": "Longcheng",
                "province": {
                    "id": 18
                }
            },
            {
                "id": 1804,
                "name": "ຮົ່ມ",
                "name_en": "Hom",
                "province": {
                    "id": 18
                }
            },
            {
                "id": 1805,
                "name": "ລ້ອງຊານ",
                "name_en": "Longsan",
                "province": {
                    "id": 18
                }
            }
        ]
        for (const item of items) {
            const items = _respository.create(item);
            await _respository.save(items);
            // console.log(`✅ Created District: ${item.name}`);
        }

        console.log('🎉 District seeding complete.');
    }
}
