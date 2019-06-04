package ru.calc.model;

class Temp {
  static String sBaseRate = "Базовый тариф. Указание закрепляет вилку базовых тарифов для каждой категории транспортных средств – от мопедов до тракторов (Приложение 1 к Указанию). Страховые компании самостоятельно выбирают наиболее приемлемый для них размер тарифа в установленном диапазоне для каждого вида транспортных средств, после чего обязаны опубликовать его на своем официальном сайте в течение трех дней со дня утверждения (п. 1 Порядка применения страховых тарифов страховщиками при определении страховой премии по договору обязательного страхования). Для транспортных средств категорий 'В' и 'ВЕ', принадлежащих гражданам либо ИП и не используемым в качестве такси, минимальный базовый тариф равен 3432 руб., максимальный – 4118 руб. Для расчета будем применять максимальный размер тарифа (4118 руб.).";
  static String sCountry = "Коэффициент страховых тарифов в зависимости от территории преимущественного использования транспортного средства. Он определяется по месту прописки (или временной регистрации) собственника автомобиля.";
  static String sBonusMalus = "Так называемый коэффициент бонус-малус. Он отражает, были ли в период действия прошлых договоров ОСАГО страховые случаи по вине водителя. В зависимости от этого по итогам каждого года КБМ может увеличиваться или снижаться.";
  static String sAgeAndExperience = "Коэффициент страховых тарифов в зависимости от возраста и стажа водителя. Стаж водителя начинает исчисляться с момента выдачи водительского удостоверения (а если были замены водительского – с момента выдачи первого удостоверения).";
  static String s5 = "Коэффициент страховых тарифов в зависимости от наличия сведений о количестве лиц, допущенных к управлению транспортным средством. Если страховка предусматривает ограничение по количеству водителей, которые допущены к управлению автомобилем (вне зависимости от фактического их количества), коэффициент составит 1. В случае, если водитель желает получить полис ОСАГО 'без ограничений', то есть с возможностью допуска к управлению неограниченного круга водителей, этот коэффициент будет равен 1,8.";
  static String sAutoInfo = "Коэффициент страховых тарифов в зависимости от технических характеристик транспортного средства, в частности мощности двигателя. Мощность автомобиля определяется по паспорту транспортного средства или свидетельства о его регистрации. Если в этих документах нужные сведения отсутствуют, страховая компания будет вынуждена ориентироваться на данные из каталогов заводов-изготовителей и других официальных источников.";
  static String sPeriodOfUse = "Коэффициент страховых тарифов в зависимости от периода использования транспортного средства.";
//  static String s8 = "Факультативный коэффициент. Специального названия ему Указание не дает. Этот коэффициент равен 1,5, а применяется он, когда водитель:\n" +
//      "сообщил страховщику ложные сведения, которые уменьшили страховую премию (например, в паспорте транспортного средства и в доступных источниках отсутствовали сведения о мощности двигателя автомобиля, и его владелец на словах занизил количество лошадиных сил);\n" +
//      "умышленно содействовал наступлению страхового случая (например, спровоцировал аварию) или увеличению связанных с ним убытков (к примеру, пытался отремонтировать за счет ОСАГО старые, существовавшие до ДТП поломки);\n" +
//      "заведомо исказил обстоятельства ДТП (например, фактически на момент аварии автомобилем управлял водитель, не занесенный в страховку, а владелец машины утверждает, что за рулем был именно он);\n" +
//      "допустил определенные нарушения, в результате которых страховщик получил право взыскать с него сумму выплаченного страхового возмещения (был нетрезв на момент ДТП, умышленно причинил вред жизни или здоровью пострадавших в аварии, скрылся с места ДТП, не был указан в полисе и т. д.) (п. 1 ст. 14 закона об ОСАГО). ";
}

public class Enum {

  public static enum Names {

    baseRate("ТБ", "Базовая ставка", Temp.sBaseRate, 4000.0),
    country("КТ", "Место жительства", Temp.sCountry, 1.0),
    bonusMalus("КБМ", "Класс бонуса-малуса", Temp.sBonusMalus, 1.0),
    ageAndExperience("КВС", "Возраст и стаж водителя", Temp.sAgeAndExperience, 1.0),
    autoInfo("КМ", "Информация о авто (мощности)", Temp.sAutoInfo, 1.0),
    periodOfUse("КС", "Период использования", Temp.sPeriodOfUse, 1.0),

    sumCredit ("sumCredit", "Сумма кредита", ".", 1000.0),
    periodCredit ("periodCredit", "Срок кредита", ".", 12.0),
    rate ("rate", "Процентная ставка", ".", 20.0),
    typeCredit("typeCredit", "Вид платежа", ".", 1.0),
    typeCreditD("typeCreditD", "Дифференцированный", ".", 1.0),
    typeCreditA("typeCreditA", "Аннуитетный", ".", 0.0),
    oneTimeCommission("oneTimeCommission", "Единовременная комиссия", ".", 0.0),
    monthlyCommission("monthlyCommission", "Ежемесячная комиссия", ".", 0.0),
    additionalConditions("additionalConditions", "Дополнительные условия", ".", 0.0),

    sumRealty("sumRealty", "Сумма недвижимости", "", 1000000.0),
    initialPayment("initialPayment", "Первоначальный взнос", "", 0.0);


    private String id;
    private String name;
    private String info;
    private Double defaultValue;

    Names(String title, String name, String info, Double defaultValue) {
      this.id = title;
      this.name = name;
      this.info = info;
      this.defaultValue = defaultValue;
    }
    public String getId() { return id; }
    public String getName() { return name; }
    public String getInfo() { return info; }
    public Double getDefaultValue() { return defaultValue; }

    public static Names myValueOfId(String id) {
      for (Names e : values())
        if (e.getId().equals(id))
          return e;

      return null;
    }
    public static Names myValueOfName(String name) {
      for (Names e : values())
        if (e.getName().equals(name))
          return e;

      return null;
    }
  }
}