-- V5.9: 272 complex-accreditation indicators and owners from the approved Uzbek source.
-- Safe to rerun. Existing progress, documents, reviews and assignments are preserved.

with source(code, responsible_label) as (
 values
  ('1.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('1.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('1.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('1.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Kengash kotibi'),
  ('1.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('1.6', 'Ta’lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('1.7', 'Kengash kotibi'),
  ('2.1', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari; Ishlar boshqarmasi boshlig‘i'),
  ('2.2', 'Bosh hisobchi'),
  ('2.3', 'Bosh hisobchi'),
  ('2.4', 'Bosh hisobchi'),
  ('2.5', 'Bosh hisobchi'),
  ('3.1', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari; Ishlar boshqarmasi boshlig‘i'),
  ('3.2', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari; Ishlar boshqarmasi boshlig‘i'),
  ('3.3', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari; Ishlar boshqarmasi boshlig‘i'),
  ('3.4', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari; Ishlar boshqarmasi boshlig‘i'),
  ('3.5', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari; Ishlar boshqarmasi boshlig‘i; Kengash kotibi'),
  ('4.1', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ishlar boshqarmasi boshlig‘i'),
  ('4.2', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('4.3', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('4.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('4.5', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('5.1', 'Registrator ofisi boshlig‘i'),
  ('5.2', 'Registrator ofisi boshlig‘i'),
  ('5.3', 'Raqamli ta''lim texnologiyalari bo‘limi boshlig‘i'),
  ('5.4', 'Raqamli ta''lim texnologiyalari bo‘limi boshlig‘i'),
  ('5.5', 'Registrator ofisi boshlig‘i'),
  ('5.6', 'Kengash kotibi'),
  ('6.1', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('6.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('6.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('6.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('6.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('6.6', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('7.1', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('7.2', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('7.3', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('7.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('7.5', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('8.1', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('8.2', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('8.3', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('8.4', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('8.5', 'Ta’lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('8.6', 'Ta’lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('9.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('9.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('9.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('9.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('9.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('9.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('10.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('10.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('10.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('10.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('10.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('10.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('10.7', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('10.8', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('11.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('11.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('11.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('11.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('11.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('11.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('12.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('12.2', 'Axborot-resurs markazi direktori'),
  ('12.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('12.4', 'Moliya-iqtisod bo‘limi boshlig‘i'),
  ('12.5', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari; Ishlar boshqarmasi boshlig‘i'),
  ('12.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('12.7', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('13.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('13.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('13.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('13.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('13.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('13.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('14.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('14.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('14.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('14.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('14.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('15.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('15.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('15.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('15.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('15.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('15.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('16.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('16.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('16.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('16.4', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('16.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('16.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('17.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('17.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('17.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('17.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('17.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('17.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('18.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('18.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('18.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('18.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('19.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('19.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('19.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('19.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('19.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('20.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('20.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('20.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('20.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('20.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('21.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('21.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('21.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('21.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('21.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('22.1', 'Xodimlar bo‘limi boshlig‘i'),
  ('22.2', 'Xodimlar bo‘limi boshlig‘i'),
  ('22.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('22.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('22.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('23.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('23.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('23.3', 'Xodimlar bo‘limi boshlig‘i'),
  ('23.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('23.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('24.1', 'Xodimlar bo‘limi boshlig‘i'),
  ('24.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('24.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('24.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('24.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('25.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('25.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('25.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('25.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('25.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('25.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('26.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari; Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('26.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('26.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('26.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('26.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('26.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('27.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('27.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('27.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('27.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('27.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('28.1', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('28.2', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('28.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('28.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('28.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('28.6', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('28.7', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('28.8', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('29.1', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('29.2', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('29.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('29.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('29.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('29.6', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('30.1', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('30.2', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('30.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('30.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('30.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('30.6', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('30.7', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('31.1', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('31.2', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('31.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('31.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('31.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('32.1', 'Axborot-resurs markazi direktori'),
  ('32.2', 'Axborot-resurs markazi direktori'),
  ('32.3', 'Axborot-resurs markazi direktori'),
  ('32.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('32.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('32.6', 'Axborot-resurs markazi direktori'),
  ('33.1', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('33.2', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('33.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('33.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('33.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('33.6', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('34.1', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('34.2', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('34.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('34.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('34.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('34.6', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('35.1', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('35.2', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('35.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('35.4', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('35.5', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('36.1', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('36.2', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('36.3', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('36.4', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('36.5', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('36.6', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i'),
  ('37.1', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; Psixolog'),
  ('37.2', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; Psixolog'),
  ('37.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('37.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('37.5', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('38.1', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('38.2', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('38.3', 'Ilmiy ishlar va innovatsiyalar bo‘yicha direktor o‘rinbosari'),
  ('38.4', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('38.5', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('38.6', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('39.1', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('39.2', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('39.3', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('39.4', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('39.5', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('39.6', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari; Psixolog'),
  ('39.7', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('40.1', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('40.2', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('40.3', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('40.4', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('40.5', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('41.1', 'Ishlar boshqarmasi boshlig‘i'),
  ('41.2', 'Ishlar boshqarmasi boshlig‘i'),
  ('41.3', 'Ishlar boshqarmasi boshlig‘i'),
  ('41.4', 'Raqamli ta''lim texnologiyalari bo‘limi boshlig‘i'),
  ('41.5', 'Ishlar boshqarmasi boshlig‘i'),
  ('41.6', 'Bosh hisobchi'),
  ('41.7', 'Ishlar boshqarmasi boshlig‘i'),
  ('42.1', 'Ishlar boshqarmasi boshlig‘i'),
  ('42.2', 'Ishlar boshqarmasi boshlig‘i'),
  ('42.3', 'Ishlar boshqarmasi boshlig‘i'),
  ('42.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('42.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('42.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('42.7', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('43.1', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('43.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('43.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('43.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('43.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('43.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('43.7', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('44.1', 'Ishlar boshqarmasi boshlig‘i'),
  ('44.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('44.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('44.4', 'Yoshlar masalalari va maʼnaviyiy-maʼrifiy ishlar boʻyicha direktor oʻrinbosari'),
  ('44.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('45.1', 'Ishlar boshqarmasi boshlig‘i'),
  ('45.2', 'Ishlar boshqarmasi boshlig‘i'),
  ('45.3', 'Ishlar boshqarmasi boshlig‘i'),
  ('45.4', 'Ishlar boshqarmasi boshlig‘i'),
  ('45.5', 'Ishlar boshqarmasi boshlig‘i'),
  ('46.1', 'Ishlar boshqarmasi boshlig‘i'),
  ('46.2', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('46.3', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('46.4', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('46.5', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('46.6', 'O‘quv ishlari bo‘yicha direktor o‘rinbosari'),
  ('47.1', 'Ishlar boshqarmasi boshlig‘i'),
  ('47.2', 'Ishlar boshqarmasi boshlig‘i'),
  ('47.3', 'Ishlar boshqarmasi boshlig‘i'),
  ('47.4', 'Ishlar boshqarmasi boshlig‘i'),
  ('47.5', 'Ta''lim sifatini nazorat qilish bo‘limi boshlig‘i')
), project as (
  select id from public.accreditation_v3_projects where code = 'complex'
)
insert into public.accreditation_v3_indicators(project_id, code, responsible_label)
select project.id, source.code, source.responsible_label
from source cross join project
on conflict(project_id, code) do update
set responsible_label = excluded.responsible_label;

create or replace function public.accreditation_v5_position_keys(label text)
returns text[] language plpgsql immutable as $$
declare s text := lower(coalesce(label,'')); r text[] := '{}';
begin
  if s='' then return r; end if;
  if s ~ 'юрисконсульт|yuriskonsult' then r:=array_append(r,'legal_counsel'); end if;
  if s ~ 'секретар.*совет|kengash kotibi|канцеляр' then r:=array_append(r,'council_secretary'); end if;
  if s ~ 'заместител.*учебн|o‘quv ishlari.*o‘rinbosari|o''quv ishlari.*o''rinbosari' then r:=array_append(r,'deputy_academic'); end if;
  if s ~ 'главн.*бухгалтер|bosh hisobchi' then r:=array_append(r,'chief_accountant'); end if;
  if s ~ 'контрол.*качеств|ta’lim sifatini nazorat|ta''lim sifatini nazorat' then r:=array_append(r,'head_quality'); end if;
  if s ~ 'управлен.*дел|ishlar boshqarmasi' then r:=array_append(r,'head_affairs'); end if;
  if s ~ 'отдел.*кадр|xodimlar bo‘limi|xodimlar bo''limi' then r:=array_append(r,'head_hr'); end if;
  if s ~ 'международн.*сотруднич|xalqaro hamkorlik' then r:=array_append(r,'head_international'); end if;
  if s ~ 'учебно-метод|o‘quv-uslubiy|o''quv-uslubiy' then r:=array_append(r,'head_methodological'); end if;
  if s ~ 'офис.*регистратор|registrator ofisi' then r:=array_append(r,'head_registrar'); end if;
  if s ~ 'научн.*исследован.*инновац|ilmiy tadqiqotlar.*innovats' then r:=array_append(r,'head_science'); end if;
  if s ~ 'заместител.*научн|ilmiy ishlar.*o‘rinbosari|ilmiy ishlar.*o''rinbosari' then r:=array_append(r,'deputy_science'); end if;
  if s ~ 'молодеж|yoshlar.*o‘rinbosari|yoshlar.*o''rinbosari' then r:=array_append(r,'deputy_youth'); end if;
  if s ~ 'финансово-эконом|reja-moliya|moliya-iqtisod' then r:=array_append(r,'head_finance'); end if;
  if s ~ 'маркетинг.*практик|marketing va talabalar amaliyoti' then r:=array_append(r,'head_marketing'); end if;
  if s ~ 'цифров.*образователь|цифров.*технолог|raqamli.*ta.lim.*texnolog|raqamli va axborot texnologiyalari' then r:=array_append(r,'head_digital'); end if;
  if s ~ 'заведующ.*кафедр|кафедр.*завед|tegishli kafedra mudiri' then r:=array_append(r,'department_head'); end if;
  if s ~ 'декан|dekanat' then r:=array_append(r,'dean'); end if;
  if s ~ 'приемн.*комисс|qabul komissiyasi' then r:=array_append(r,'admissions_secretary'); end if;
  if s ~ 'апелляц|apellyatsiya' then r:=array_append(r,'appeal_secretary'); end if;
  if s ~ 'комплаенс|komplayens' then r:=array_append(r,'compliance'); end if;
  if s ~ 'информационно-ресурс|axborot-resurs markazi' then r:=array_append(r,'library'); end if;
  if s ~ 'пресс-секретар|matbuot kotibi' then r:=array_append(r,'press_secretary'); end if;
  if s ~ 'гражданск.*защит|охран.*труд|mehnatni muhofaza' then r:=array_append(r,'civil_protection'); end if;
  if s ~ 'психолог|psixolog' then r:=array_append(r,'psychologist'); end if;
  if s ~ 'kpi' then r:=array_append(r,'kpi_chair'); end if;
  return (select coalesce(array_agg(distinct x),'{}') from unnest(r) x);
end $$;

update public.accreditation_v3_indicators i
set position_keys = public.accreditation_v5_position_keys(i.responsible_label)
from public.accreditation_v3_projects p
where p.id=i.project_id and p.code='complex';

-- Remove assignments that no longer match the corrected source, then assign
-- every active approved employee to the indicators for their current role.
update public.accreditation_v3_indicators i
set responsible_user_id = null
from public.accreditation_v3_profiles profile,
     public.accreditation_v3_projects project
where project.id = i.project_id
  and project.code = 'complex'
  and profile.user_id = i.responsible_user_id
  and not (profile.position_key = any(i.position_keys));

do $$
declare profile record;
begin
  for profile in
    select user_id, position_key
    from public.accreditation_v3_profiles
    where approval_status = 'approved'
      and is_active
      and position_key is not null
      and position_key <> 'director'
  loop
    perform public.accreditation_v5_assign_user(profile.user_id, profile.position_key);
  end loop;
end $$;

select count(*) as complex_indicators
from public.accreditation_v3_indicators i
join public.accreditation_v3_projects p on p.id=i.project_id
where p.code='complex';
