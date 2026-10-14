// OTOMATİK OLUŞTURULMUŞ GENİŞ TÜRK & DÜNYA MUTFAĞI ARŞİVİ (383 TARİF)
import type { RecipeCategory } from '../types/recipe';

export interface CompactTurkishRecipe {
  id: string;
  title: string;
  cat: Exclude<RecipeCategory, 'tumu'>;
  ings: string[];
  steps?: string[];
}

export const COMPACT_TURKISH_ARCHIVE: CompactTurkishRecipe[] = [
  {
    "id": "tr-1",
    "title": "Mercimek Çorbası",
    "cat": "corba",
    "ings": [
      "kırmızı mercimek",
      "soğan",
      "havuç",
      "patates",
      "sıvı yağ",
      "salça",
      "nane",
      "pul biber",
      "tuz",
      "su",
      "limon"
    ],
    "steps": [
      "Mercimekleri yıkayın ve süzün.",
      "Tencerede sıvı yağı ısıtıp küp doğranmış soğanı hafif pembeleşinceye kadar kavurun.",
      "Salçayı ekleyip kokusu çıkana kadar 1-2 dakika daha kavurun.",
      "Rendelenmiş veya küçük küp doğranmış havuç ve patatesi ekleyip birkaç dakika daha kavurun.",
      "Yıkanmış mercimekleri, tuzu, naneyi, pul biberi ve yaklaşık 5-6 su bardağı sıcak suyu ekleyin.",
      "Tencerenin kapağını kapatıp sebzeler ve mercimekler tamamen yumuşayana kadar (yaklaşık 25-30 dakika) orta-kısık ateşte pişirin.",
      "Çorba piştikten sonra blenderdan geçirin veya ince bir süzgeçten geçirin.",
      "Kıvamı çok koyuysa biraz daha sıcak su ekleyip bir taşım daha kaynatın.",
      "Üzerine isteğe bağlı olarak tereyağında kızdırılmış nane ve pul biber gezdirip, limon dilimi ile servis yapın."
    ]
  },
  {
    "id": "tr-2",
    "title": "Ezogelin Çorbası",
    "cat": "corba",
    "ings": [
      "kırmızı mercimek",
      "pirinç",
      "bulgur",
      "soğan",
      "sarımsak",
      "sıvı yağ",
      "salça",
      "biber salçası",
      "nane",
      "pul biber",
      "tuz",
      "su",
      "limon"
    ],
    "steps": [
      "Mercimek, pirinç ve bulguru yıkayıp süzün.",
      "Tencerede sıvı yağı ısıtıp ince doğranmış soğan ve ezilmiş sarımsağı pembeleşinceye kadar kavurun.",
      "Domates ve biber salçasını ekleyip 1-2 dakika kavurun.",
      "Yıkanmış bakliyatları, naneyi, pul biberi ve tuzu ekleyin.",
      "Yaklaşık 6-7 su bardağı sıcak suyu ekleyip karıştırın.",
      "Tencerenin kapağını kapatıp tüm malzemeler iyice yumuşayana kadar (yaklaşık 30-35 dakika) orta-kısık ateşte pişirin.",
      "Ara sıra karıştırarak dibinin tutmasını engelleyin.",
      "Pişen çorbayı blenderdan geçirebilir veya taneli bırakabilirsiniz.",
      "Kıvamını ayarlamak için sıcak su ekleyebilirsiniz.",
      "Limon dilimi ve isteğe bağlı olarak nane ile servis yapın."
    ]
  },
  {
    "id": "tr-3",
    "title": "Yayla Çorbası",
    "cat": "corba",
    "ings": [
      "pirinç",
      "yoğurt",
      "yumurta",
      "un",
      "su",
      "tavuk suyu",
      "tereyağı",
      "nane",
      "tuz",
      "pul biber"
    ],
    "steps": [
      "Pirinci yıkayıp süzün. Tencereye alın, üzerine suyu (ve varsa tavuk suyunu) ve tuzu ekleyip pirinçler yumuşayana kadar haşlayın.",
      "Ayrı bir kapta yoğurt, yumurta sarısı (veya bütün yumurta) ve unu iyice çırpın. Pürüzsüz bir kıvam almalı.",
      "Haşlanan pirincin sıcak suyundan 1-2 kepçe alıp yavaşça yoğurtlu karışıma ekleyin ve sürekli çırparak terbiyeyi ılıtın (kesilmemesi için).",
      "Ilıttığınız terbiyeyi yavaşça ve sürekli karıştırarak tenceredeki pirinçli suya ekleyin.",
      "Çorbayı karıştırarak bir taşım kaynatın. Kaynadıktan sonra altını kısıp 1-2 dakika daha pişirin.",
      "Küçük bir tavada tereyağını eritin. Naneyi (ve isteğe bağlı pul biberi) ekleyip hafifçe yakın.",
      "Hazırladığınız naneli yağı çorbanın üzerine gezdirin.",
      "Sıcak servis yapın."
    ]
  },
  {
    "id": "tr-4",
    "title": "Tarhana Çorbası",
    "cat": "corba",
    "ings": [
      "toz tarhana",
      "su",
      "salça",
      "tereyağı",
      "sıvı yağ",
      "nane",
      "pul biber",
      "tuz",
      "sarımsak"
    ],
    "steps": [
      "Geniş bir kasede tarhanayı yaklaşık 1-1.5 su bardağı soğuk su ile karıştırıp eritin ve 10-15 dakika bekletin.",
      "Tencerede tereyağı ve sıvı yağı ısıtın. İsteğe bağlı olarak rendelenmiş veya ezilmiş sarımsağı ekleyip hafifçe kavurun.",
      "Salçayı ekleyip kokusu çıkana kadar kavurun.",
      "Islattığınız tarhanayı ve kalan suyu (toplamda yaklaşık 5-6 su bardağı olacak şekilde) tencereye ekleyin.",
      "Tuzu, naneyi ve pul biberi ekleyin.",
      "Çorbayı topaklanmaması için kaynayana kadar sürekli karıştırın.",
      "Kaynamaya başlayınca altını kısın ve 5-10 dakika daha kıvam alana kadar pişirin.",
      "Sıcak servis yapın. Üzerine kruton ekmek yakışır."
    ]
  },
  {
    "id": "tr-5",
    "title": "Kuru Fasulye (Etli)",
    "cat": "bakliyat_pilav",
    "ings": [
      "kuru fasulye",
      "kuşbaşı et",
      "soğan",
      "salça",
      "biber salçası",
      "sıvı yağ",
      "tereyağı",
      "tuz",
      "pul biber",
      "karabiber",
      "su"
    ],
    "steps": [
      "Kuru fasulyeyi bir gece önceden ıslatın veya haşlama yöntemini kullanın.",
      "Düdüklü tencerede sıvı yağ ve tereyağını ısıtın. Kuşbaşı etleri ekleyip suyunu salıp çekene kadar kavurun.",
      "Yemeklik doğranmış soğanı ekleyip pembeleşinceye kadar kavurun.",
      "Domates ve biber salçasını ekleyip 1-2 dakika kavurun.",
      "Haşlanmış ve süzülmüş kuru fasulyeleri ekleyin.",
      "Tuzu, pul biberi ve karabiberi ekleyip karıştırın.",
      "Fasulyelerin üzerini 2-3 parmak geçecek kadar sıcak su ekleyin.",
      "Düdüklü tencerenin kapağını kapatın. Düdük öttükten sonra altını kısıp yaklaşık 20-30 dakika (fasulyenin cinsine göre değişir) pişirin.",
      "Piştikten sonra havasını alıp kapağını açın. Yanında pilav ve turşu ile servis yapın."
    ]
  },
  {
    "id": "tr-6",
    "title": "Tas Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "dana kuşbaşı",
      "soğan",
      "arpa şehriye",
      "domates",
      "yeşil biber",
      "tereyağı",
      "sıvı yağ",
      "salça",
      "tuz",
      "karabiber",
      "kekik",
      "pul biber",
      "su"
    ],
    "steps": [
      "Geniş bir tencerede sıvı yağ ve tereyağını ısıtın. Kuşbaşı etleri ekleyip suyunu salıp çekene kadar yüksek ateşte kavurun.",
      "Yemeklik doğranmış soğanı ekleyip pembeleşene kadar kavurun.",
      "Doğranmış biberleri ekleyip birkaç dakika daha kavurun.",
      "Salçayı ekleyip kokusu çıkana kadar kavurun.",
      "Küp doğranmış domatesleri (veya rendelenmiş) ekleyip karıştırın.",
      "Tuzu ve baharatları (karabiber, kekik, pul biber) ekleyin.",
      "Etlerin üzerini geçecek kadar sıcak su ekleyin. Tencerenin kapağını kapatıp etler yumuşayana kadar kısık ateşte pişirin (yaklaşık 45-60 dakika).",
      "Ayrı bir tavada az tereyağı ile arpa şehriyeyi rengi dönene kadar kavurun.",
      "Pişen etli karışımın ortasına ısıya dayanıklı bir kaseyi ters çevirerek yerleştirin.",
      "Kasenin etrafına kavrulmuş arpa şehriyeyi yayın.",
      "Şehriyelerin üzerini geçecek kadar sıcak su ekleyin.",
      "Tencerenin kapağını tekrar kapatıp şehriyeler suyunu çekip yumuşayana kadar kısık ateşte pişirin (yaklaşık 15-20 dakika).",
      "Piştikten sonra 10 dakika dinlendirip ortadaki kaseyi dikkatlice çıkarın ve servis yapın."
    ]
  },
  {
    "id": "tr-7",
    "title": "İzmir Köfte",
    "cat": "et_tavuk",
    "ings": [
      "kıyma",
      "bayat ekmek içi",
      "soğan",
      "yumurta",
      "maydanoz",
      "kimyon",
      "karabiber",
      "tuz",
      "patates",
      "domates",
      "yeşil biber",
      "salça",
      "sıvı yağ",
      "su"
    ],
    "steps": [
      "Köfte için kıymayı, rendelenmiş ve suyu sıkılmış soğanı, ıslatılıp ufalanmış ekmek içini, yumurtayı, ince kıyılmış maydanozu, kimyonu, karabiberi ve tuzu bir kapta iyice yoğurun.",
      "Köfte harcından parmak şeklinde köfteler hazırlayın.",
      "Patatesleri elma dilimi şeklinde doğrayın. Domatesleri ve biberleri de iri parçalar halinde doğrayın.",
      "Geniş bir tavada veya fırın tepsisinde az sıvı yağda köfteleri ve patatesleri hafifçe kızartın (tam pişmeyecek).",
      "Fırın tepsisine kızartılmış köfteleri ve patatesleri dizin. Aralarına domates ve biber dilimlerini yerleştirin.",
      "Sosu için: Küçük bir kapta salçayı az sıcak su ile ezin. Üzerine yaklaşık 1-1.5 su bardağı sıcak su ve biraz tuz ekleyip karıştırın.",
      "Hazırladığınız salçalı sosu tepsideki malzemelerin üzerine gezdirin.",
      "Önceden ısıtılmış 180-200°C fırında patatesler ve köfteler iyice yumuşayana kadar (yaklaşık 30-40 dakika) pişirin.",
      "Sıcak olarak servis yapın."
    ]
  },
  {
    "id": "tr-8",
    "title": "Hünkar Beğendi",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "soğan",
      "domates",
      "yeşil biber",
      "salça",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "kekik",
      "su",
      "patlıcan",
      "un",
      "süt",
      "kaşar peyniri",
      "muskat"
    ],
    "steps": [
      "Beğendi için: Patlıcanları közleyin (ocakta, fırında veya mangalda). Kabuklarını soyup ince ince kıyın veya ezin.",
      "Ayrı bir tencerede tereyağını eritin. Unu ekleyip kokusu çıkana kadar hafifçe kavurun.",
      "Kavrulan una azar azar ve sürekli çırparak soğuk sütü ekleyin. Topaklanmamasına dikkat edin.",
      "Muhallebi kıvamına gelince közlenmiş ve kıyılmış patlıcanları ekleyin.",
      "Rendelenmiş kaşar peynirini, tuzu ve çok az muskat rendesini ekleyip peynir eriyene kadar karıştırın. Beğendiyi ocaktan alın.",
      "Et sote için: Geniş bir tencerede sıvı yağ ve tereyağını ısıtın. Kuşbaşı etleri ekleyip suyunu salıp çekene kadar yüksek ateşte kavurun.",
      "Yemeklik doğranmış soğanı ekleyip pembeleşene kadar kavurun.",
      "Doğranmış biberleri ekleyip birkaç dakika daha kavurun.",
      "Salçayı ekleyip kokusu çıkana kadar kavurun.",
      "Küp doğranmış domatesleri (veya rendelenmiş) ekleyip karıştırın.",
      "Tuzu ve baharatları (karabiber, kekik) ekleyin.",
      "Çok az sıcak su ekleyip (yaklaşık yarım çay bardağı) tencerenin kapağını kapatın ve etler yumuşayana kadar kısık ateşte pişirin.",
      "Servis tabağına önce beğendiyi yayın. Üzerine et soteyi koyarak sıcak servis yapın."
    ]
  },
  {
    "id": "tr-9",
    "title": "Tavuk Sote",
    "cat": "et_tavuk",
    "ings": [
      "tavuk göğsü",
      "tavuk but",
      "soğan",
      "yeşil biber",
      "kırmızı biber",
      "sarımsak",
      "domates",
      "salça",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "pul biber",
      "kekik"
    ],
    "steps": [
      "Tavuk etlerini kuşbaşı şeklinde doğrayın.",
      "Geniş bir tava veya tencerede sıvı yağı kızdırın.",
      "Tavuk etlerini ekleyip yüksek ateşte suyunu salıp çekene kadar kavurun.",
      "Yemeklik doğranmış soğanı ve ince kıyılmış sarımsağı ekleyip soğanlar pembeleşene kadar kavurun.",
      "Jülyen veya küp doğranmış renkli biberleri ekleyip biberler hafif yumuşayana kadar kavurun.",
      "Salçayı ekleyip 1 dakika kadar kavurun.",
      "Kabuğu soyulmuş ve küp doğranmış domatesleri ekleyin.",
      "Tuzu ve baharatları (karabiber, pul biber, kekik) ekleyip karıştırın.",
      "Tencerenin kapağını kapatıp domatesler suyunu salıp çekene ve tavuklar iyice pişene kadar (yaklaşık 15-20 dakika) kısık ateşte pişirin.",
      "Sıcak olarak pilav veya makarna ile servis yapın."
    ]
  },
  {
    "id": "tr-10",
    "title": "Fırında Tavuk But",
    "cat": "et_tavuk",
    "ings": [
      "tavuk but",
      "patates",
      "havuç",
      "soğan",
      "sarımsak",
      "biberiye",
      "kekik",
      "pul biber",
      "salça",
      "yoğurt",
      "sıvı yağ",
      "tuz",
      "karabiber"
    ],
    "steps": [
      "Geniş bir kapta sosu hazırlayın: Yoğurt, salça, sıvı yağ, rendelenmiş sarımsak, tuz, karabiber, kekik, pul biber ve isteğe bağlı biberiyeyi karıştırın.",
      "Tavuk butlarını bu sosla iyice harmanlayın ve mümkünse 30 dakika kadar marine edin.",
      "Patatesleri ve havuçları soyup elma dilimi veya küp şeklinde doğrayın. Soğanı halka şeklinde doğrayın.",
      "Fırın tepsisine sebzeleri (patates, havuç, soğan) yayın. Üzerlerine biraz tuz, karabiber ve sıvı yağ gezdirip harmanlayın.",
      "Marine edilmiş tavuk butlarını sebzelerin üzerine yerleştirin.",
      "Tepsinin üzerini yağlı kağıt veya alüminyum folyo ile kapatın.",
      "Önceden ısıtılmış 200°C fırında yaklaşık 30-40 dakika pişirin.",
      "Daha sonra üzerini açıp tavukların ve sebzelerin üzeri kızarana kadar (yaklaşık 15-20 dakika daha) pişirmeye devam edin.",
      "Sıcak servis yapın."
    ]
  },
  {
    "id": "tr-11",
    "title": "Zeytinyağlı Enginar Dolması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "enginar",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "dereotu",
      "nane",
      "şeker",
      "tuz",
      "karabiber",
      "yenibahar",
      "zeytinyağı",
      "limon",
      "su"
    ],
    "steps": [
      "Enginarları temizleyip kararmaması için limonlu suda bekletin.",
      "İç harcı için: Tencerede zeytinyağını ısıtıp ince doğranmış soğanı pembeleşinceye kadar kavurun.",
      "Çam fıstığını ekleyip hafif renk alana kadar kavurun.",
      "Yıkanmış pirinci ekleyip birkaç dakika şeffaflaşana kadar kavurun.",
      "Kuş üzümünü, tuzu, şekeri ve baharatları (karabiber, yenibahar) ekleyin.",
      "Yaklaşık 1 su bardağı sıcak su ekleyip karıştırın. Kısık ateşte pirinçler suyunu çekene kadar pişirin.",
      "Ocaktan alıp ince kıyılmış dereotu ve naneyi ekleyip karıştırın. Harcı demlenmeye bırakın.",
      "Enginarların içini hazırladığınız harçla doldurun.",
      "Enginarları geniş ve yayvan bir tencereye dizin.",
      "Üzerlerine biraz zeytinyağı gezdirin ve yarım limonun suyunu sıkın.",
      "Tencerenin kenarından enginarların yarısına gelecek kadar sıcak su ekleyin.",
      "Tencerenin kapağını kapatıp kısık ateşte enginarlar yumuşayana kadar (yaklaşık 30-40 dakika) pişirin.",
      "Soğuduktan sonra servis yapın."
    ]
  },
  {
    "id": "tr-12",
    "title": "İmam Bayıldı",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "patlıcan",
      "soğan",
      "domates",
      "sarımsak",
      "yeşil biber",
      "maydanoz",
      "zeytinyağı",
      "şeker",
      "tuz",
      "karabiber",
      "su"
    ],
    "steps": [
      "Patlıcanları alacalı soyup tuzlu suda 15-20 dakika bekletin, sonra kurulayın.",
      "Bol yağda patlıcanları hafif kızartıp kağıt havlu üzerine alın (veya fırında közleyin/kızartın).",
      "Ayrı bir tavada zeytinyağında ince doğranmış soğan ve sarımsağı pembeleşinceye kadar kavurun.",
      "Doğranmış biberleri ekleyip birkaç dakika daha kavurun.",
      "Küp doğranmış domatesleri, tuzu, karabiberi, şekeri ve ince kıyılmış maydanozu ekleyin. Domatesler suyunu salıp çekene kadar pişirin.",
      "Patlıcanların ortasını bıçakla yarık açarak bir kaşık yardımıyla hafifçe oyun.",
      "Hazırladığınız iç harcı patlıcanların içine doldurun.",
      "Patlıcanları yayvan bir tencereye veya fırın kabına dizin.",
      "Üzerlerine biraz su veya domates sosu gezdirip kısık ateşte (veya fırında 180°C'de) patlıcanlar iyice yumuşayana kadar (yaklaşık 30-40 dakika) pişirin.",
      "Soğuk veya ılık servis yapın."
    ]
  },
  {
    "id": "tr-13",
    "title": "Zeytinyağlı Taze Fasulye",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "taze fasulye",
      "domates",
      "soğan",
      "sarımsak",
      "zeytinyağı",
      "şeker",
      "tuz",
      "su"
    ],
    "steps": [
      "Taze fasulyeleri ayıklayıp yıkayın ve isteğe bağlı olarak kırın veya bütün bırakın.",
      "Tencerede zeytinyağını ısıtıp yemeklik doğranmış soğanı ve ince kıyılmış sarımsağı pembeleşinceye kadar kavurun.",
      "Kabukları soyulmuş ve küp doğranmış domatesleri ekleyip domatesler eriyene kadar birkaç dakika pişirin.",
      "Ayıklanmış fasulyeleri, tuzu ve şekeri ekleyip karıştırın.",
      "Tencerenin kapağını kapatın ve fasulyeler kendi suyunu salıp hafifçe rengi dönene kadar kısık ateşte pişirin (yaklaşık 10-15 dakika).",
      "Fasulyelerin üzerini geçmeyecek kadar (yaklaşık yarım su bardağı) sıcak su ekleyin.",
      "Tencerenin kapağını tekrar kapatıp fasulyeler yumuşayana kadar kısık ateşte pişirmeye devam edin (yaklaşık 30-40 dakika).",
      "Ocaktan alıp soğumasını bekleyin.",
      "Soğuk olarak servis yapın."
    ]
  },
  {
    "id": "tr-14",
    "title": "Kabak Mücver",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kabak",
      "yumurta",
      "un",
      "taze soğan",
      "dereotu",
      "maydanoz",
      "tuz",
      "karabiber",
      "pul biber",
      "sıvı yağ"
    ],
    "steps": [
      "Kabakları rendeleyin ve fazla suyunu iyice sıkın.",
      "Geniş bir kapta rendelenmiş ve suyu sıkılmış kabakları, yumurtaları, ince kıyılmış taze soğanı, dereotunu ve maydanozu karıştırın.",
      "Unu azar azar ekleyerek kek hamurundan biraz daha koyu bir kıvam elde edene kadar karıştırın (un miktarı kabağın suyuna göre değişir).",
      "Tuzu, karabiberi ve pul biberi ekleyip tekrar karıştırın.",
      "Geniş bir tavada sıvı yağı kızdırın.",
      "Hazırladığınız mücver harcından bir kaşık alıp kızgın yağa bırakın. Kaşığın tersiyle üzerini hafifçe düzeltin.",
      "Mücverlerin her iki tarafını da altın sarısı renk alana kadar orta ateşte kızartın.",
      "Kızaran mücverleri kağıt havlu serilmiş bir tabağa alın.",
      "Sarımsaklı yoğurt ile birlikte sıcak veya ılık servis yapın."
    ]
  },
  {
    "id": "tr-15",
    "title": "Pirinç Pilavı (Şehriyeli)",
    "cat": "bakliyat_pilav",
    "ings": [
      "pirinç",
      "arpa şehriye",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "sıcak su",
      "tavuk suyu"
    ],
    "steps": [
      "Pirinci tuzlu ılık suda en az 20-30 dakika bekletin, sonra nişastası gidene kadar iyice yıkayıp süzün.",
      "Pilav tenceresinde tereyağı ve sıvı yağı eritin.",
      "Arpa şehriyeyi ekleyip rengi kahverengiye dönene kadar sürekli karıştırarak kavurun.",
      "Süzülmüş pirinci ekleyip pirinç taneleri şeffaflaşana kadar birkaç dakika daha kavurun.",
      "Tuzu ekleyin.",
      "Sıcak suyu (ve varsa sıcak tavuk suyunu) ekleyin. Su miktarı genellikle pirincin üzerini bir parmak geçecek kadar olmalıdır (pirincin cinsine göre ayarlayın, genellikle 1 ölçü pirince 1.5 ölçü su).",
      "Tencerenin kapağını kapatın. Kaynamaya başlayınca altını en kısık ayara getirin.",
      "Pirinçler suyunu tamamen çekene kadar (yaklaşık 10-15 dakika) pişirin.",
      "Ocaktan aldıktan sonra tencerenin üzerine kağıt havlu serip kapağını kapatın ve 10-15 dakika demlenmeye bırakın.",
      "Demlendikten sonra tahta kaşıkla nazikçe karıştırıp servis yapın."
    ]
  },
  {
    "id": "tr-16",
    "title": "Bulgur Pilavı (Domatesli)",
    "cat": "bakliyat_pilav",
    "ings": [
      "pilavlık bulgur",
      "soğan",
      "yeşil biber",
      "domates",
      "salça",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "pul biber",
      "sıcak su"
    ],
    "steps": [
      "Pilav tenceresinde tereyağı ve sıvı yağı eritin.",
      "Yemeklik doğranmış soğanı ekleyip pembeleşinceye kadar kavurun.",
      "İnce doğranmış yeşil biberi ekleyip birkaç dakika daha kavurun.",
      "Salçayı ekleyip kokusu çıkana kadar kavurun.",
      "Kabuğu soyulmuş ve küp doğranmış domatesleri ekleyip domatesler hafif eriyene kadar pişirin.",
      "Yıkanmış ve süzülmüş bulguru ekleyip birkaç dakika kavurun.",
      "Tuzu ve baharatları (karabiber, pul biber) ekleyin.",
      "Sıcak suyu ekleyin (genellikle 1 ölçü bulgura 2 ölçü su). Karıştırın.",
      "Tencerenin kapağını kapatın. Kaynamaya başlayınca altını en kısık ayara getirin.",
      "Bulgur suyunu tamamen çekene kadar (yaklaşık 15-20 dakika) pişirin.",
      "Ocaktan aldıktan sonra tencerenin üzerine kağıt havlu serip kapağını kapatın ve 10 dakika demlenmeye bırakın.",
      "Demlendikten sonra karıştırıp servis yapın."
    ]
  },
  {
    "id": "tr-17",
    "title": "Mantı",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "yumurta",
      "su",
      "tuz",
      "kıyma",
      "soğan",
      "karabiber",
      "pul biber",
      "yoğurt",
      "sarımsak",
      "tereyağı",
      "salça",
      "nane"
    ],
    "steps": [
      "Hamur için: Unu geniş bir kaba alın, ortasını havuz gibi açın. Yumurtayı, tuzu ve azar azar suyu ekleyerek sert bir hamur yoğurun. Üzerini örtüp 30 dakika dinlendirin.",
      "İç harcı için: Kıyma, rendelenmiş ve suyu sıkılmış soğan, karabiber, pul biber ve tuzu karıştırın.",
      "Dinlenen hamuru bezelere ayırın. Her bezeyi unlanmış tezgahta oklava ile çok ince olmayacak şekilde açın.",
      "Açtığınız yufkayı küçük kareler halinde kesin (yaklaşık 1.5-2 cm).",
      "Her karenin ortasına hazırladığınız kıymalı harçtan az miktarda koyun.",
      "Karenin dört köşesini ortada birleştirerek veya bohça şeklinde kapatın.",
      "Geniş bir tencerede bol tuzlu suyu kaynatın.",
      "Hazırladığınız mantıları kaynar suya atın. Mantılar suyun yüzeyine çıkınca (yaklaşık 10-15 dakika) pişmiş demektir. Kevgirle süzerek servis tabağına alın.",
      "Sosu için: Yoğurdu ezilmiş sarımsak ve biraz tuz ile çırpın.",
      "Ayrı bir tavada tereyağını eritin. Salçayı ekleyip kavurun. Nane ve pul biberi ekleyip ocaktan alın.",
      "Servis tabağındaki mantıların üzerine önce sarımsaklı yoğurdu, sonra salçalı sosu gezdirin.",
      "İsteğe bağlı olarak sumak serpip sıcak servis yapın."
    ]
  },
  {
    "id": "tr-18",
    "title": "Su Böreği (Hazır Yufkadan Pratik)",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "hazır yufka",
      "beyaz peynir",
      "lor peyniri",
      "maydanoz",
      "yumurta",
      "süt",
      "sıvı yağ",
      "tereyağı",
      "su",
      "tuz"
    ],
    "steps": [
      "İç harcı için: Peynirleri bir kapta ezin. İnce kıyılmış maydanozu ekleyip karıştırın.",
      "Sosu için: Yumurta, süt, sıvı yağ ve tuzu bir kapta çırpın.",
      "Geniş bir tencerede bol suyu kaynatın. Ayrı bir geniş kaba soğuk su doldurun.",
      "Fırın tepsisini eritilmiş tereyağı ile yağlayın.",
      "İlk yufkayı kuru olarak tepsiye serin, kenarları dışarı taşsın.",
      "İkinci yufkayı dörde bölün. Her parçayı önce kaynar suya batırıp 10-15 saniye tutun, sonra hemen kevgirle alıp soğuk suya batırın. Sudan çıkarıp hafifçe suyunu sıkın.",
      "Haşlanmış yufka parçasını buruşturarak tepsiye yayın. Üzerine hazırladığınız sostan gezdirin.",
      "Bu işlemi yufkaların yarısı bitene kadar tekrarlayın (genellikle 2-3 yufka).",
      "Yufkaların yarısını serdikten sonra peynirli iç harcı eşit şekilde yayın.",
      "Kalan yufkaları da aynı şekilde haşlayıp, soğuk sudan geçirip, buruşturarak tepsiye yayın. Her katın arasına sostan gezdirin.",
      "En üste serilecek son yufkayı haşlamayın. Kuru yufkayı tepsinin üzerine kapatın. Kenarlardan taşan ilk yufkayı da üzerine doğru kapatın.",
      "Kalan sosu böreğin üzerine dökün. Eritilmiş tereyağını gezdirin.",
      "Böreği dilimleyin.",
      "Önceden ısıtılmış 180°C fırında üzeri ve altı iyice kızarana kadar (yaklaşık 40-50 dakika) pişirin.",
      "Fırından çıkınca üzerini hafif nemli bir bezle örtüp 10 dakika dinlendirin ve servis yapın."
    ]
  },
  {
    "id": "tr-19",
    "title": "Sigara Böreği",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "hazır yufka",
      "lor peyniri",
      "beyaz peynir",
      "maydanoz",
      "yumurta akı",
      "sıvı yağ"
    ],
    "steps": [
      "İç harcı için: Peynirleri bir kapta ezin. İnce kıyılmış maydanozu ekleyip karıştırın (isteğe bağlı pul biber eklenebilir).",
      "Yufkaları üst üste koyup genellikle 8 veya 12 eşit üçgen parçaya bölün.",
      "Her bir üçgen yufkanın geniş kenarına hazırladığınız peynirli harçtan bir miktar koyun.",
      "Yufkanın kenarlarını içe doğru katlayın.",
      "Ardından yufkayı sıkıca rulo şeklinde sarın.",
      "Rulonun uç kısmını suya veya yumurta akına batırarak yapıştırın.",
      "Tüm yufkalar bitene kadar aynı işlemi tekrarlayın.",
      "Geniş bir tavada bol sıvı yağı kızdırın.",
      "Hazırladığınız börekleri kızgın yağa atıp her tarafı altın sarısı renk alana kadar kızartın.",
      "Kızaran börekleri kevgirle alıp kağıt havlu serilmiş bir tabağa çıkarın.",
      "Sıcak olarak servis yapın."
    ]
  },
  {
    "id": "tr-20",
    "title": "Gözleme (Peynirli)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "su",
      "tuz",
      "maya",
      "beyaz peynir",
      "lor peyniri",
      "maydanoz",
      "tereyağı"
    ],
    "steps": [
      "Hamur için: Unu yoğurma kabına alın. Ortasını açıp tuzu ve instant mayayı (veya suda eritilmiş yaş mayayı) ekleyin. Azar azar ılık su ekleyerek ele yapışmayan yumuşak bir hamur yoğurun.",
      "Hamurun üzerini örtüp ılık bir ortamda 30-45 dakika mayalanmaya bırakın.",
      "İç harcı için: Peynirleri ezin, ince kıyılmış maydanozu ekleyip karıştırın.",
      "Mayalanan hamurdan mandalina büyüklüğünde bezeler koparın.",
      "Her bezeyi unlanmış tezgahta oklava veya merdane ile ince yuvarlak şekilde açın.",
      "Açtığınız hamurun yarısına peynirli harçtan yayın.",
      "Hamurun diğer yarısını harcın üzerine kapatarak yarım ay şekli verin. Kenarlarını parmak uçlarınızla bastırarak iyice kapatın.",
      "Geniş, yapışmaz bir tavayı veya sacı ısıtın (yağsız).",
      "Hazırladığınız gözlemeyi ısıtılmış tavaya alın.",
      "Orta ateşte arkalı önlü, üzerinde kahverengi benekler oluşana kadar pişirin.",
      "Pişen gözlemeyi tavadan alıp sıcakken üzerine tereyağı sürün.",
      "Tüm bezeler bitene kadar aynı işlemi tekrarlayın.",
      "Sıcak olarak ayran ile servis yapın."
    ]
  },
  {
    "id": "tr-21",
    "title": "Çoban Salata",
    "cat": "salata_meze",
    "ings": [
      "domates",
      "salatalık",
      "yeşil biber",
      "kırmızı soğan",
      "maydanoz",
      "zeytinyağı",
      "limon suyu",
      "tuz",
      "sumak"
    ],
    "steps": [
      "Domates, salatalık (isteğe bağlı kabuklu veya soyulmuş), biber ve soğanı küçük küpler halinde doğrayın.",
      "Maydanozu ince ince kıyın.",
      "Doğranmış tüm malzemeleri geniş bir salata kasesinde karıştırın.",
      "Ayrı bir küçük kapta sosu hazırlayın: Zeytinyağı, taze sıkılmış limon suyu, tuz ve isteğe bağlı olarak sumak ekleyip iyice çırpın.",
      "Hazırladığınız sosu salatanın üzerine gezdirin.",
      "Servis yapmadan hemen önce nazikçe harmanlayın."
    ]
  },
  {
    "id": "tr-22",
    "title": "Gavurdağı Salatası",
    "cat": "salata_meze",
    "ings": [
      "domates",
      "salatalık",
      "yeşil biber",
      "kırmızı soğan",
      "maydanoz",
      "nane",
      "ceviz",
      "zeytinyağı",
      "nar ekşisi",
      "limon suyu",
      "pul biber",
      "sumak",
      "tuz"
    ],
    "steps": [
      "Domates, salatalık, biber ve soğanı çok küçük (neredeyse zar büyüklüğünde) küpler halinde doğrayın.",
      "Maydanoz ve naneyi ince ince kıyın.",
      "Ceviz içini irili ufaklı olacak şekilde dövün veya bıçakla kıyın.",
      "Doğranmış tüm sebzeleri ve yeşillikleri salata kasesine alın.",
      "Sosu için: Zeytinyağı, nar ekşisi, limon suyu, pul biber, sumak ve tuzu bir kapta iyice karıştırın.",
      "Hazırladığınız sosu salatanın üzerine gezdirin.",
      "Kıyılmış ceviz içini ekleyin.",
      "Tüm malzemeyi nazikçe harmanlayın.",
      "Bekletmeden servis yapın."
    ]
  },
  {
    "id": "tr-23",
    "title": "Haydari",
    "cat": "salata_meze",
    "ings": [
      "süzme yoğurt",
      "sarımsak",
      "nane",
      "dereotu",
      "zeytinyağı",
      "tuz"
    ],
    "steps": [
      "Süzme yoğurdu bir kaseye alın.",
      "Sarımsakları ezin veya çok ince rendeleyin ve yoğurda ekleyin.",
      "Tuzu ekleyin.",
      "Kuru naneyi ekleyin.",
      "İsteğe bağlı olarak çok ince kıyılmış dereotu ekleyebilirsiniz.",
      "Zeytinyağını ekleyip tüm malzemeyi iyice karıştırın.",
      "Kıvamı çok koyuysa normal yoğurt veya bir iki kaşık su ile ayarlayabilirsiniz.",
      "Servis tabağına alıp üzerini zeytinyağı ve nane ile süsleyerek servis yapın."
    ]
  },
  {
    "id": "tr-24",
    "title": "Acılı Ezme",
    "cat": "salata_meze",
    "ings": [
      "domates",
      "yeşil biber",
      "kırmızı biber",
      "soğan",
      "sarımsak",
      "maydanoz",
      "salça",
      "biber salçası",
      "zeytinyağı",
      "nar ekşisi",
      "limon suyu",
      "pul biber",
      "isot",
      "nane",
      "tuz"
    ],
    "steps": [
      "Domates, biberler, soğan ve sarımsağı çok ince olacak şekilde bıçakla kıyın veya mutfak robotundan çok kısa süre geçirin (püre olmamalı, dişe gelir kıvamda kalmalı).",
      "Fazla suyu varsa sebzelerin suyunu hafifçe sıkın.",
      "Maydanozu ince ince kıyın.",
      "Tüm doğranmış malzemeyi bir kaba alın.",
      "Salçaları, zeytinyağını, nar ekşisini, limon suyunu, tuzu ve baharatları (pul biber, isot, nane) ekleyin.",
      "Tüm malzemeyi bir kaşık yardımıyla iyice karıştırın.",
      "Tadını kontrol edip isteğe göre tuz, acı veya ekşilik oranını ayarlayın.",
      "Servis tabağına alıp servis yapın."
    ]
  },
  {
    "id": "tr-25",
    "title": "Humus",
    "cat": "salata_meze",
    "ings": [
      "nohut",
      "tahin",
      "sarımsak",
      "limon suyu",
      "kimyon",
      "tuz",
      "su",
      "zeytinyağı",
      "pul biber"
    ],
    "steps": [
      "Haşlanmış nohutların kabuklarını soyun (daha pürüzsüz olması için önemlidir).",
      "Mutfak robotuna haşlanmış ve kabukları soyulmuş nohutları, tahini, ezilmiş sarımsağı, limon suyunu, kimyonu ve tuzu alın.",
      "Robotu çalıştırın. Karışım katı olursa azar azar soğuk su (veya nohutun haşlama suyundan) ekleyerek krema kıvamına gelene kadar çekmeye devam edin.",
      "Kıvam alan humusu servis tabağına yayın.",
      "Ortasını kaşıkla hafifçe çukurlaştırın.",
      "Üzerine bolca zeytinyağı gezdirin.",
      "Pul biber ve isteğe bağlı olarak haşlanmış nohut taneleri veya maydanoz ile süsleyerek servis yapın."
    ]
  },
  {
    "id": "tr-26",
    "title": "Sütlaç (Fırın)",
    "cat": "tatli",
    "ings": [
      "süt",
      "pirinç",
      "şeker",
      "pirinç unu",
      "nişasta",
      "vanilya",
      "su",
      "yumurta sarısı"
    ],
    "steps": [
      "Pirinci yıkayıp süzün. Küçük bir tencereye alın, üzerine 2 su bardağı su ekleyip pirinçler suyu çekip hafif yumuşayana kadar haşlayın.",
      "Ayrı bir tencerede sütü ısıtın (kaynamasın).",
      "Haşlanmış pirinci sıcak sütün içine ekleyin.",
      "Bir kasede pirinç unu, nişasta ve yarım su bardağı soğuk sütü (veya suyu) pürüzsüz hale gelene kadar karıştırın.",
      "Bu nişastalı karışımı yavaşça ve sürekli karıştırarak tenceredeki süte ekleyin.",
      "Şekeri ve vanilyayı ekleyin.",
      "Sütlacı kısık ateşte, ara sıra karıştırarak kıvam alana kadar (yaklaşık 15-20 dakika) pişirin.",
      "Pişen sütlaçtan bir kepçe kadar alıp ayrı bir kasede yumurta sarısı ile hızlıca çırpın.",
      "Bu yumurtalı karışımı tekrar tencereye ekleyip 1-2 dakika daha karıştırarak pişirin.",
      "Sütlacı ısıya dayanıklı güveç kaplarına veya fırın kaselerine paylaştırın.",
      "Kaseleri fırın tepsisine dizin. Tepsinin tabanına kaselerin yarısına gelecek kadar soğuk su doldurun.",
      "Fırının sadece üst ızgara (broil) ayarını açın veya en yüksek dereceye ayarlayın (yaklaşık 220-250°C).",
      "Tepsiyi fırının üst rafına yakın yerleştirin.",
      "Sütlaçların üzeri kızarana kadar (yaklaşık 10-15 dakika, fırına göre değişir) kontrollü bir şekilde pişirin.",
      "Fırından çıkarıp oda sıcaklığına gelmesini bekleyin, sonra buzdolabında soğutun.",
      "Soğuk servis yapın."
    ]
  },
  {
    "id": "tr-27",
    "title": "Revani",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "şeker",
      "yoğurt",
      "sıvı yağ",
      "irmik",
      "un",
      "kabartma tozu",
      "vanilya",
      "limon kabuğu rendesi",
      "su",
      "limon suyu"
    ],
    "steps": [
      "Şerbeti için: Tencerede su ve şekeri karıştırın. Kaynamaya başlayınca altını kısıp 10-15 dakika kadar kıvam alana kadar kaynatın. Ocaktan almaya yakın limon suyunu ekleyip karıştırın ve soğumaya bırakın.",
      "Keki için: Geniş bir kapta yumurta ve şekeri köpük köpük olana kadar iyice çırpın.",
      "Yoğurt ve sıvı yağı ekleyip karıştırın.",
      "İrmik, un, kabartma tozu, vanilya ve limon kabuğu rendesini ekleyip spatula ile yavaşça karıştırın (çok fazla karıştırmayın).",
      "Hazırladığınız kek harcını yağlanmış orta boy bir fırın tepsisine veya borcama dökün.",
      "Önceden ısıtılmış 170-180°C fırında üzeri kızarana ve kürdan temiz çıkana kadar (yaklaşık 30-35 dakika) pişirin.",
      "Fırından çıkan sıcak kekin üzerine soğuk şerbeti eşit şekilde gezdirin.",
      "Şerbetini çekmesi için en az 2-3 saat dinlendirin.",
      "Dilimleyerek servis yapın. Üzerini hindistan cevizi veya antep fıstığı ile süsleyebilirsiniz."
    ]
  },
  {
    "id": "tr-28",
    "title": "İrmik Helvası (Sütlü)",
    "cat": "tatli",
    "ings": [
      "irmik",
      "tereyağı",
      "sıvı yağ",
      "çam fıstığı",
      "süt",
      "su",
      "şeker"
    ],
    "steps": [
      "Şerbeti için: Tencerede süt, su ve şekeri karıştırın. Şeker eriyene kadar ısıtın (kaynamasına gerek yok). Ocaktan alıp kenarda bekletin.",
      "Geniş bir tencerede veya tavada tereyağı ve sıvı yağı eritin.",
      "Çam fıstıklarını ekleyip hafif pembeleşinceye kadar kavurun.",
      "İrmiği ekleyin. Sürekli karıştırarak irmiğin rengi hafif kahverengiye dönene kadar (yaklaşık 15-20 dakika) kısık ateşte kavurun.",
      "Kavrulan irmiğin üzerine sıcak şerbeti dikkatlice ve yavaşça dökün (bu aşamada sıçrayabilir, dikkatli olun).",
      "Hızlıca karıştırın.",
      "Tencerenin kapağını kapatın ve altını en kısık ayara getirin.",
      "İrmik şerbetini tamamen çekene kadar (yaklaşık 5-10 dakika) pişirin.",
      "Ocaktan alınca üzerine kağıt havlu serip kapağını kapatın ve 15-20 dakika demlenmeye bırakın.",
      "Demlendikten sonra karıştırıp servis yapın. Dondurma ile servis edilmesi yaygındır."
    ]
  },
  {
    "id": "tr-29",
    "title": "Aşure",
    "cat": "tatli",
    "ings": [
      "buğday",
      "nohut",
      "kuru fasulye",
      "pirinç",
      "kuru kayısı",
      "kuru incir",
      "kuru üzüm",
      "kuş üzümü",
      "portakal kabuğu rendesi",
      "şeker",
      "su",
      "ceviz",
      "fındık",
      "badem",
      "nar",
      "tarçın",
      "karanfil"
    ],
    "steps": [
      "Buğday, nohut ve kuru fasulyeyi bir gece önceden ayrı kaplarda ıslatın.",
      "Ertesi gün ıslatma sularını döküp buğdayı büyük bir tencereye alın. Üzerini bolca geçecek kadar su ekleyip yumuşayana kadar haşlayın.",
      "Nohut ve kuru fasulyeyi de ayrı tencerelerde yumuşayana kadar haşlayın ve sularını süzün.",
      "Kuru kayısı ve kuru inciri küçük küpler halinde doğrayın. Kuru üzüm ve kuş üzümünü yıkayın.",
      "Haşlanmış buğdayın olduğu tencereye haşlanmış nohut, kuru fasulye ve yıkanmış pirinci ekleyin.",
      "Doğranmış kuru kayısı, incir, kuru üzüm ve kuş üzümünü ekleyin.",
      "Portakal kabuğu rendesini ekleyin.",
      "Malzemelerin üzerini geçecek kadar sıcak su ekleyin (kıvamını kontrol ederek ekleme yapın).",
      "Şekeri ekleyip eriyene kadar karıştırın (şeker miktarını damak zevkinize göre ayarlayın).",
      "Aşureyi ara sıra karıştırarak kısık ateşte tüm malzemeler özdeşleşip kıvam alana kadar (yaklaşık 30-45 dakika) pişirin. Gerekirse sıcak su ekleyebilirsiniz.",
      "Pişen aşureyi kaselere paylaştırın.",
      "Soğuduktan sonra üzerini nar taneleri, dövülmüş ceviz, fındık, badem ve toz tarçın ile süsleyerek servis yapın."
    ]
  },
  {
    "id": "tr-30",
    "title": "Kazandibi",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "pirinç unu",
      "nişasta",
      "tereyağı",
      "vanilya",
      "pudra şekeri"
    ],
    "steps": [
      "Tencereye süt, şeker, pirinç unu ve nişastayı alın.",
      "Ocağa almadan önce tel çırpıcı ile pürüzsüz hale gelene kadar karıştırın.",
      "Tencereyi ocağa alın ve sürekli karıştırarak muhallebi kıvamına gelene kadar pişirin.",
      "Kaynamaya başlayınca tereyağını ve vanilyayı ekleyip karıştırın ve ocaktan alın.",
      "Orta boy, tercihen metal bir tepsiyi (veya borcamı) tereyağı ile hafifçe yağlayın.",
      "Tepsinin tabanına bolca pudra şekeri serpin (yanık kısmı oluşturacak).",
      "Pişirdiğiniz muhallebiyi yavaşça tepsiye dökün.",
      "Tepsiyi ocağın üzerine alın (varsa ocak gözü dağıtıcısı kullanın). Orta ateşte tepsiyi sürekli çevirerek muhallebinin altını yakın (yaklaşık 10-15 dakika). Kenarlarından kontrol ederek renginin döndüğünü görebilirsiniz.",
      "Yakma işlemi bitince tepsiyi ocaktan alın ve oda sıcaklığına gelmesini bekleyin.",
      "Sonra buzdolabında en az 3-4 saat iyice soğutun.",
      "Soğuyan kazandibini dilimleyin. Spatula yardımıyla rulo yaparak veya dilim olarak servis yapın. Üzerine tarçın serpilebilir."
    ]
  },
  {
    "id": "tr-31",
    "title": "Menemen",
    "cat": "kahvalti",
    "ings": [
      "domates",
      "yeşil biber",
      "yumurta",
      "sıvı yağ",
      "tereyağı",
      "tuz",
      "pul biber"
    ]
  },
  {
    "id": "tr-32",
    "title": "Kısır",
    "cat": "salata_meze",
    "ings": [
      "köftelik bulgur",
      "soğan",
      "sarımsak",
      "salça",
      "biber salçası",
      "nar ekşisi",
      "zeytinyağı",
      "limon suyu",
      "maydanoz",
      "taze soğan",
      "marul",
      "domates",
      "salatalık",
      "tuz",
      "pul biber",
      "kimyon",
      "nane"
    ]
  },
  {
    "id": "tr-33",
    "title": "Yaprak Sarma (Zeytinyağlı)",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "asma yaprağı",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "zeytinyağı",
      "nane",
      "dereotu",
      "karabiber",
      "yenibahar",
      "tarçın",
      "şeker",
      "tuz",
      "limon",
      "su"
    ]
  },
  {
    "id": "tr-34",
    "title": "Lahmacun",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "su",
      "maya",
      "tuz",
      "şeker",
      "kıyma",
      "soğan",
      "domates",
      "yeşil biber",
      "kırmızı biber",
      "maydanoz",
      "sarımsak",
      "salça",
      "biber salçası",
      "pul biber",
      "karabiber",
      "kimyon",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-35",
    "title": "Piyaz",
    "cat": "salata_meze",
    "ings": [
      "kuru fasulye",
      "kırmızı soğan",
      "domates",
      "maydanoz",
      "yumurta",
      "zeytinyağı",
      "sirke",
      "limon suyu",
      "tuz",
      "sumak"
    ]
  },
  {
    "id": "tr-36",
    "title": "Adana Kebap",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kıyma",
      "kuyruk yağı",
      "pul biber",
      "tuz",
      "kırmızı toz biber"
    ]
  },
  {
    "id": "tr-37",
    "title": "Urfa Kebap",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kıyma",
      "kuyruk yağı",
      "tuz",
      "karabiber",
      "isot"
    ]
  },
  {
    "id": "tr-38",
    "title": "İskender Kebap",
    "cat": "et_tavuk",
    "ings": [
      "döner et",
      "pide ekmeği",
      "tereyağı",
      "domates sosu",
      "yoğurt",
      "domates",
      "yeşil biber"
    ]
  },
  {
    "id": "tr-39",
    "title": "Ali Nazik Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "patlıcan",
      "yoğurt",
      "sarımsak",
      "kuzu kuşbaşı",
      "tereyağı",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-40",
    "title": "Mücver",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kabak",
      "havuç",
      "patates",
      "un",
      "yumurta",
      "taze soğan",
      "dereotu",
      "maydanoz",
      "tuz",
      "karabiber",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-41",
    "title": "Domates Çorbası",
    "cat": "corba",
    "ings": [
      "domates",
      "un",
      "tereyağı",
      "süt",
      "su",
      "tuz",
      "karabiber",
      "kaşar peyniri"
    ]
  },
  {
    "id": "tr-42",
    "title": "Brokoli Çorbası",
    "cat": "corba",
    "ings": [
      "brokoli",
      "soğan",
      "patates",
      "havuç",
      "süt",
      "krema",
      "tereyağı",
      "un",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-43",
    "title": "Mantar Çorbası",
    "cat": "corba",
    "ings": [
      "mantar",
      "soğan",
      "sarımsak",
      "un",
      "tereyağı",
      "süt",
      "krema",
      "tuz",
      "karabiber",
      "maydanoz"
    ]
  },
  {
    "id": "tr-44",
    "title": "Tavuklu Şehriye Çorbası",
    "cat": "corba",
    "ings": [
      "tavuk suyu",
      "tavuk göğsü",
      "tel şehriye",
      "arpa şehriye",
      "havuç",
      "maydanoz",
      "limon",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-45",
    "title": "İşkembe Çorbası",
    "cat": "corba",
    "ings": [
      "işkembe",
      "un",
      "yumurta sarısı",
      "yoğurt",
      "sirke",
      "sarımsak",
      "tereyağı",
      "pul biber",
      "tuz",
      "limon"
    ]
  },
  {
    "id": "tr-46",
    "title": "Kelle Paça Çorbası",
    "cat": "corba",
    "ings": [
      "kelle",
      "paça",
      "un",
      "yumurta sarısı",
      "yoğurt",
      "sirke",
      "sarımsak",
      "tereyağı",
      "pul biber",
      "tuz",
      "limon"
    ]
  },
  {
    "id": "tr-47",
    "title": "Düğün Çorbası",
    "cat": "corba",
    "ings": [
      "kuzu gerdan",
      "un",
      "yumurta sarısı",
      "limon suyu",
      "tereyağı",
      "pul biber",
      "nane",
      "tuz"
    ]
  },
  {
    "id": "tr-48",
    "title": "Tutmaç Çorbası",
    "cat": "corba",
    "ings": [
      "erişte",
      "yeşil mercimek",
      "nohut",
      "yoğurt",
      "un",
      "yumurta",
      "tereyağı",
      "nane",
      "pul biber",
      "tuz",
      "soğan"
    ]
  },
  {
    "id": "tr-49",
    "title": "Lebeniye Çorbası",
    "cat": "corba",
    "ings": [
      "nohut",
      "pirinç",
      "kıyma",
      "soğan",
      "yoğurt",
      "yumurta",
      "un",
      "nane",
      "tereyağı",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-50",
    "title": "Soğuk Ayran Aşı Çorbası",
    "cat": "corba",
    "ings": [
      "buğday",
      "nohut",
      "yoğurt",
      "su",
      "nane",
      "tuz",
      "dereotu"
    ]
  },
  {
    "id": "tr-51",
    "title": "Yeşil Mercimek Çorbası",
    "cat": "corba",
    "ings": [
      "yeşil mercimek",
      "soğan",
      "salça",
      "un",
      "erişte",
      "sıvı yağ",
      "tereyağı",
      "nane",
      "pul biber",
      "tuz",
      "su"
    ]
  },
  {
    "id": "tr-52",
    "title": "Balkabağı Çorbası",
    "cat": "corba",
    "ings": [
      "balkabağı",
      "soğan",
      "patates",
      "havuç",
      "zencefil",
      "sarımsak",
      "krema",
      "tereyağı",
      "tuz",
      "karabiber",
      "muskat"
    ]
  },
  {
    "id": "tr-53",
    "title": "Kuzu Tandır",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kol",
      "soğan",
      "sarımsak",
      "defne yaprağı",
      "biberiye",
      "tuz",
      "karabiber",
      "tereyağı",
      "su"
    ]
  },
  {
    "id": "tr-54",
    "title": "Çoban Kavurma",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "soğan",
      "domates",
      "yeşil biber",
      "sarımsak",
      "tereyağı",
      "kekik",
      "pul biber",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-55",
    "title": "Orman Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "dana kuşbaşı",
      "havuç",
      "patates",
      "bezelye",
      "soğan",
      "salça",
      "tereyağı",
      "un",
      "tuz",
      "karabiber",
      "kekik",
      "su"
    ]
  },
  {
    "id": "tr-56",
    "title": "İslim Kebabı (Kürdan Kebabı)",
    "cat": "et_tavuk",
    "ings": [
      "kıyma",
      "soğan",
      "bayat ekmek içi",
      "yumurta",
      "kimyon",
      "tuz",
      "karabiber",
      "patlıcan",
      "domates",
      "yeşil biber",
      "salça",
      "sıvı yağ",
      "su"
    ]
  },
  {
    "id": "tr-57",
    "title": "Patlıcan Musakka",
    "cat": "et_tavuk",
    "ings": [
      "patlıcan",
      "kıyma",
      "soğan",
      "sarımsak",
      "domates",
      "yeşil biber",
      "salça",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "maydanoz",
      "su"
    ]
  },
  {
    "id": "tr-58",
    "title": "Dalyan Köfte",
    "cat": "et_tavuk",
    "ings": [
      "kıyma",
      "soğan",
      "galeta unu",
      "yumurta",
      "kimyon",
      "tuz",
      "karabiber",
      "havuç",
      "bezelye",
      "yumurta",
      "salça",
      "su"
    ]
  },
  {
    "id": "tr-59",
    "title": "Terbiyeli Sulu Köfte",
    "cat": "et_tavuk",
    "ings": [
      "kıyma",
      "pirinç",
      "soğan",
      "maydanoz",
      "un",
      "tuz",
      "karabiber",
      "patates",
      "havuç",
      "yumurta sarısı",
      "limon suyu",
      "su",
      "sıvı yağ",
      "nane"
    ]
  },
  {
    "id": "tr-60",
    "title": "Ekşili Köfte",
    "cat": "et_tavuk",
    "ings": [
      "kıyma",
      "pirinç",
      "soğan",
      "maydanoz",
      "un",
      "tuz",
      "karabiber",
      "patates",
      "havuç",
      "yumurta sarısı",
      "limon suyu",
      "sumak",
      "nane",
      "sıvı yağ",
      "su"
    ]
  },
  {
    "id": "tr-61",
    "title": "Kadınbudu Köfte",
    "cat": "et_tavuk",
    "ings": [
      "kıyma",
      "pirinç",
      "soğan",
      "yumurta",
      "un",
      "galeta unu",
      "maydanoz",
      "tuz",
      "karabiber",
      "kimyon",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-62",
    "title": "Ciğer Sote (Arnavut Ciğeri Değil)",
    "cat": "et_tavuk",
    "ings": [
      "kuzu ciğeri",
      "soğan",
      "domates",
      "yeşil biber",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "pul biber",
      "kekik"
    ]
  },
  {
    "id": "tr-63",
    "title": "Etli Nohut Yemeği",
    "cat": "bakliyat_pilav",
    "ings": [
      "nohut",
      "kuşbaşı et",
      "soğan",
      "salça",
      "biber salçası",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "kimyon",
      "pul biber",
      "su"
    ]
  },
  {
    "id": "tr-64",
    "title": "Etli Bamya Yemeği",
    "cat": "et_tavuk",
    "ings": [
      "bamya",
      "kuşbaşı et",
      "soğan",
      "domates",
      "sarımsak",
      "limon suyu",
      "sıvı yağ",
      "salça",
      "tuz",
      "karabiber",
      "su"
    ]
  },
  {
    "id": "tr-65",
    "title": "Etli Türlü Güveç",
    "cat": "et_tavuk",
    "ings": [
      "kuşbaşı et",
      "patlıcan",
      "kabak",
      "patates",
      "yeşil fasulye",
      "domates",
      "yeşil biber",
      "soğan",
      "sarımsak",
      "salça",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "kekik",
      "pul biber",
      "su"
    ]
  },
  {
    "id": "tr-66",
    "title": "Kuzu Haşlama",
    "cat": "et_tavuk",
    "ings": [
      "kuzu incik",
      "kuzu gerdan",
      "patates",
      "havuç",
      "soğan",
      "kereviz",
      "defne yaprağı",
      "tane karabiber",
      "tuz",
      "su",
      "limon suyu",
      "yumurta sarısı"
    ]
  },
  {
    "id": "tr-67",
    "title": "Sac Kavurma",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "kuyruk yağı",
      "soğan",
      "sivri biber",
      "domates",
      "tereyağı",
      "pul biber",
      "kekik",
      "tuz"
    ]
  },
  {
    "id": "tr-68",
    "title": "Antep Tava",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "patlıcan",
      "domates",
      "yeşil biber",
      "kırmızı biber",
      "sarımsak",
      "soğan",
      "biber salçası",
      "tuz",
      "karabiber",
      "pul biber"
    ]
  },
  {
    "id": "tr-69",
    "title": "Elbasan Tava",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "soğan",
      "tereyağı",
      "un",
      "yumurta",
      "yoğurt",
      "sarımsak",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-70",
    "title": "Pastırmalı Kuru Fasulye",
    "cat": "bakliyat_pilav",
    "ings": [
      "kuru fasulye",
      "pastırma",
      "soğan",
      "salça",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "pul biber",
      "su"
    ]
  },
  {
    "id": "tr-71",
    "title": "Tavuklu Pilav",
    "cat": "bakliyat_pilav",
    "ings": [
      "pirinç",
      "tavuk göğsü",
      "tavuk suyu",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "nohut"
    ]
  },
  {
    "id": "tr-72",
    "title": "Tavuk Şiş",
    "cat": "et_tavuk",
    "ings": [
      "tavuk göğsü",
      "tavuk but",
      "yoğurt",
      "salça",
      "sıvı yağ",
      "kekik",
      "pul biber",
      "tuz",
      "soğan",
      "biber",
      "domates"
    ]
  },
  {
    "id": "tr-73",
    "title": "Tavuklu Mantar Sote",
    "cat": "et_tavuk",
    "ings": [
      "tavuk göğsü",
      "mantar",
      "soğan",
      "sarımsak",
      "krema",
      "kaşar peyniri",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "kekik",
      "maydanoz"
    ]
  },
  {
    "id": "tr-74",
    "title": "Beşamel Soslu Tavuk",
    "cat": "et_tavuk",
    "ings": [
      "tavuk göğsü",
      "soğan",
      "havuç",
      "bezelye",
      "mantar",
      "un",
      "süt",
      "tereyağı",
      "muskat",
      "kaşar peyniri",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-75",
    "title": "Tavuklu Makarna Salatası",
    "cat": "salata_meze",
    "ings": [
      "makarna",
      "tavuk göğsü",
      "mısır konservesi",
      "salatalık turşusu",
      "bezelye",
      "havuç",
      "yoğurt",
      "mayonez",
      "dereotu",
      "tuz"
    ]
  },
  {
    "id": "tr-76",
    "title": "Çerkez Tavuğu",
    "cat": "et_tavuk",
    "ings": [
      "bütün tavuk",
      "ceviz",
      "bayat ekmek içi",
      "sarımsak",
      "tavuk suyu",
      "pul biber",
      "karabiber",
      "tuz",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-77",
    "title": "Tavuklu Börek",
    "cat": "hamur_borek",
    "ings": [
      "hazır yufka",
      "tavuk göğsü",
      "soğan",
      "havuç",
      "bezelye",
      "mantar",
      "yumurta",
      "yoğurt",
      "sıvı yağ",
      "susam",
      "çörek otu",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-78",
    "title": "Kremalı Mantarlı Tavuk",
    "cat": "et_tavuk",
    "ings": [
      "tavuk göğsü",
      "mantar",
      "soğan",
      "sarımsak",
      "krema",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "kekik",
      "maydanoz",
      "makarna"
    ]
  },
  {
    "id": "tr-79",
    "title": "Tavuklu Wrap (Dürüm)",
    "cat": "et_tavuk",
    "ings": [
      "tavuk göğsü",
      "lavaş ekmeği",
      "marul",
      "domates",
      "soğan",
      "salatalık turşusu",
      "mayonez",
      "ketçap",
      "pul biber",
      "kekik",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-80",
    "title": "Ballı Susamlı Tavuk",
    "cat": "et_tavuk",
    "ings": [
      "tavuk kanat",
      "tavuk göğsü",
      "bal",
      "soya sosu",
      "susam",
      "susam yağı",
      "zencefil",
      "sarımsak",
      "nişasta",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-81",
    "title": "Zeytinyağlı Pırasa",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "pırasa",
      "havuç",
      "pirinç",
      "zeytinyağı",
      "limon suyu",
      "portakal suyu",
      "şeker",
      "tuz",
      "su"
    ]
  },
  {
    "id": "tr-82",
    "title": "Zeytinyağlı Kereviz",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kereviz",
      "havuç",
      "patates",
      "bezelye",
      "portakal suyu",
      "limon suyu",
      "zeytinyağı",
      "un",
      "şeker",
      "tuz",
      "dereotu",
      "su"
    ]
  },
  {
    "id": "tr-83",
    "title": "Zeytinyağlı Bakla",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "taze bakla",
      "dereotu",
      "soğan",
      "sarımsak",
      "un",
      "zeytinyağı",
      "limon suyu",
      "şeker",
      "tuz",
      "su",
      "yoğurt"
    ]
  },
  {
    "id": "tr-84",
    "title": "Zeytinyağlı Barbunya Pilaki",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "barbunya",
      "havuç",
      "patates",
      "soğan",
      "sarımsak",
      "domates",
      "salça",
      "zeytinyağı",
      "şeker",
      "tuz",
      "maydanoz",
      "su"
    ]
  },
  {
    "id": "tr-85",
    "title": "Ispanak Yemeği (Yumurtalı)",
    "cat": "kahvalti",
    "ings": [
      "ıspanak",
      "soğan",
      "pirinç",
      "salça",
      "sıvı yağ",
      "pul biber",
      "tuz",
      "yumurta",
      "yoğurt"
    ]
  },
  {
    "id": "tr-86",
    "title": "Pazı Kavurması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "pazı",
      "soğan",
      "sarımsak",
      "bulgur",
      "pirinç",
      "salça",
      "sıvı yağ",
      "pul biber",
      "tuz",
      "yumurta"
    ]
  },
  {
    "id": "tr-87",
    "title": "Patlıcan Oturtma",
    "cat": "et_tavuk",
    "ings": [
      "patlıcan",
      "kıyma",
      "soğan",
      "domates",
      "yeşil biber",
      "sarımsak",
      "salça",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "maydanoz",
      "su"
    ]
  },
  {
    "id": "tr-88",
    "title": "Kabak Kalye",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kabak",
      "soğan",
      "domates",
      "pirinç",
      "dereotu",
      "nane",
      "zeytinyağı",
      "tuz",
      "şeker"
    ]
  },
  {
    "id": "tr-89",
    "title": "Şakşuka",
    "cat": "salata_meze",
    "ings": [
      "patlıcan",
      "kabak",
      "biber",
      "patates",
      "domates",
      "sarımsak",
      "salça",
      "sirke",
      "şeker",
      "tuz",
      "sıvı yağ",
      "maydanoz"
    ]
  },
  {
    "id": "tr-90",
    "title": "Deniz Börülcesi Salatası",
    "cat": "salata_meze",
    "ings": [
      "deniz börülcesi",
      "sarımsak",
      "limon suyu",
      "zeytinyağı",
      "nar ekşisi"
    ]
  },
  {
    "id": "tr-91",
    "title": "Semizotu Salatası (Yoğurtlu)",
    "cat": "salata_meze",
    "ings": [
      "semizotu",
      "yoğurt",
      "sarımsak",
      "zeytinyağı",
      "pul biber",
      "nane",
      "tuz",
      "ceviz"
    ]
  },
  {
    "id": "tr-92",
    "title": "Enginar Salatası",
    "cat": "salata_meze",
    "ings": [
      "enginar kalbi",
      "dereotu",
      "taze soğan",
      "mısır konservesi",
      "közlenmiş kırmızı biber",
      "zeytinyağı",
      "limon suyu",
      "tuz"
    ]
  },
  {
    "id": "tr-93",
    "title": "Mercimek Köftesi",
    "cat": "bakliyat_pilav",
    "ings": [
      "kırmızı mercimek",
      "köftelik bulgur",
      "soğan",
      "sarımsak",
      "salça",
      "biber salçası",
      "sıvı yağ",
      "kimyon",
      "pul biber",
      "karabiber",
      "tuz",
      "maydanoz",
      "taze soğan",
      "marul",
      "limon"
    ]
  },
  {
    "id": "tr-94",
    "title": "Fellah Köftesi",
    "cat": "bakliyat_pilav",
    "ings": [
      "köftelik bulgur",
      "irmik",
      "un",
      "yumurta",
      "biber salçası",
      "kimyon",
      "tuz",
      "domates",
      "sarımsak",
      "maydanoz",
      "nar ekşisi",
      "zeytinyağı",
      "pul biber"
    ]
  },
  {
    "id": "tr-95",
    "title": "Börülce Salatası",
    "cat": "salata_meze",
    "ings": [
      "börülce",
      "kırmızı soğan",
      "domates",
      "maydanoz",
      "dereotu",
      "közlenmiş kırmızı biber",
      "zeytinyağı",
      "limon suyu",
      "nar ekşisi",
      "sumak",
      "tuz"
    ]
  },
  {
    "id": "tr-96",
    "title": "Karnabahar Kızartması (Yoğurtlu Soslu)",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "karnabahar",
      "yumurta",
      "un",
      "galeta unu",
      "sıvı yağ",
      "yoğurt",
      "sarımsak",
      "nane",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-97",
    "title": "Pırasa Köftesi",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "pırasa",
      "havuç",
      "yumurta",
      "galeta unu",
      "un",
      "maydanoz",
      "tuz",
      "karabiber",
      "pul biber",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-98",
    "title": "Yeşil Domates Kavurması",
    "cat": "et_tavuk",
    "ings": [
      "yeşil domates",
      "soğan",
      "sarımsak",
      "mısır unu",
      "sıvı yağ",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-99",
    "title": "Turp Otu Salatası",
    "cat": "salata_meze",
    "ings": [
      "turp otu",
      "sarımsak",
      "limon suyu",
      "zeytinyağı",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-100",
    "title": "Patates Salatası",
    "cat": "salata_meze",
    "ings": [
      "patates",
      "kırmızı soğan",
      "taze soğan",
      "maydanoz",
      "dereotu",
      "marul",
      "zeytinyağı",
      "limon suyu",
      "hardal",
      "tuz",
      "karabiber",
      "pul biber",
      "sumak"
    ]
  },
  {
    "id": "tr-101",
    "title": "İç Pilav",
    "cat": "bakliyat_pilav",
    "ings": [
      "pirinç",
      "soğan",
      "kuzu ciğeri",
      "çam fıstığı",
      "kuş üzümü",
      "tereyağı",
      "sıvı yağ",
      "yenibahar",
      "tarçın",
      "karabiber",
      "tuz",
      "şeker",
      "dereotu",
      "tavuk suyu",
      "su"
    ]
  },
  {
    "id": "tr-102",
    "title": "Perde Pilavı",
    "cat": "bakliyat_pilav",
    "ings": [
      "pirinç",
      "tavuk göğsü",
      "badem",
      "kuş üzümü",
      "karabiber",
      "tuz",
      "tavuk suyu",
      "un",
      "yumurta",
      "yoğurt",
      "tereyağı",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-103",
    "title": "Meyhane Pilavı",
    "cat": "bakliyat_pilav",
    "ings": [
      "pilavlık bulgur",
      "soğan",
      "yeşil biber",
      "kırmızı biber",
      "domates",
      "nohut",
      "salça",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "pul biber",
      "et suyu",
      "su"
    ]
  },
  {
    "id": "tr-104",
    "title": "Firik Pilavı",
    "cat": "bakliyat_pilav",
    "ings": [
      "firik bulguru",
      "pilavlık bulgur",
      "soğan",
      "tereyağı",
      "sıvı yağ",
      "nohut",
      "tavuk suyu",
      "et suyu",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-105",
    "title": "Mercimekli Bulgur Pilavı",
    "cat": "bakliyat_pilav",
    "ings": [
      "pilavlık bulgur",
      "yeşil mercimek",
      "soğan",
      "salça",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "su"
    ]
  },
  {
    "id": "tr-106",
    "title": "Nohutlu Pilav",
    "cat": "bakliyat_pilav",
    "ings": [
      "pirinç",
      "nohut",
      "tereyağı",
      "sıvı yağ",
      "tavuk suyu",
      "su",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-107",
    "title": "Salçalı Makarna",
    "cat": "bakliyat_pilav",
    "ings": [
      "makarna",
      "salça",
      "biber salçası",
      "sıvı yağ",
      "tereyağı",
      "nane",
      "pul biber",
      "tuz",
      "su",
      "sarımsak"
    ]
  },
  {
    "id": "tr-108",
    "title": "Fırında Makarna",
    "cat": "bakliyat_pilav",
    "ings": [
      "fırın makarna",
      "beyaz peynir",
      "kaşar peyniri",
      "yumurta",
      "süt",
      "tereyağı",
      "un",
      "muskat",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-109",
    "title": "Erişte (Kesme Makarna)",
    "cat": "bakliyat_pilav",
    "ings": [
      "erişte",
      "tereyağı",
      "ceviz",
      "tulum peyniri",
      "lor peyniri",
      "tuz"
    ]
  },
  {
    "id": "tr-110",
    "title": "Hıngel (Mantı Benzeri)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "yumurta",
      "su",
      "tuz",
      "patates",
      "soğan",
      "karabiber",
      "pul biber",
      "tereyağı",
      "yoğurt",
      "sarımsak"
    ]
  },
  {
    "id": "tr-111",
    "title": "Sini Mantısı (Tepsi Mantısı)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "yumurta",
      "su",
      "tuz",
      "kıyma",
      "soğan",
      "karabiber",
      "pul biber",
      "tereyağı",
      "salça",
      "et suyu",
      "yoğurt",
      "sarımsak"
    ]
  },
  {
    "id": "tr-112",
    "title": "Yağ Mantısı",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "yumurta",
      "su",
      "tuz",
      "kıyma",
      "soğan",
      "karabiber",
      "pul biber",
      "sıvı yağ",
      "yoğurt",
      "sarımsak",
      "salça",
      "tereyağı"
    ]
  },
  {
    "id": "tr-113",
    "title": "Kıymalı Börek (Tepsi)",
    "cat": "hamur_borek",
    "ings": [
      "hazır yufka",
      "kıyma",
      "soğan",
      "maydanoz",
      "karabiber",
      "pul biber",
      "tuz",
      "yumurta",
      "yoğurt",
      "süt",
      "sıvı yağ",
      "tereyağı"
    ]
  },
  {
    "id": "tr-114",
    "title": "Ispanaklı Börek (Tepsi)",
    "cat": "hamur_borek",
    "ings": [
      "hazır yufka",
      "ıspanak",
      "soğan",
      "lor peyniri",
      "beyaz peynir",
      "pul biber",
      "karabiber",
      "tuz",
      "yumurta",
      "yoğurt",
      "süt",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-115",
    "title": "Patatesli Börek (Tepsi)",
    "cat": "hamur_borek",
    "ings": [
      "hazır yufka",
      "patates",
      "soğan",
      "salça",
      "pul biber",
      "karabiber",
      "tuz",
      "yumurta",
      "yoğurt",
      "süt",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-116",
    "title": "Kol Böreği (Peynirli)",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "hazır yufka",
      "beyaz peynir",
      "lor peyniri",
      "maydanoz",
      "yumurta",
      "süt",
      "sıvı yağ",
      "tereyağı",
      "maden suyu"
    ]
  },
  {
    "id": "tr-117",
    "title": "Gül Böreği (Kıymalı)",
    "cat": "et_tavuk",
    "ings": [
      "hazır yufka",
      "kıyma",
      "soğan",
      "karabiber",
      "tuz",
      "maydanoz",
      "yumurta sarısı",
      "yoğurt",
      "sıvı yağ",
      "susam"
    ]
  },
  {
    "id": "tr-118",
    "title": "Çiğ Börek (Çibörek)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "su",
      "sirke",
      "tuz",
      "kıyma",
      "soğan",
      "karabiber",
      "tuz",
      "su",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-119",
    "title": "Talaş Böreği",
    "cat": "et_tavuk",
    "ings": [
      "milföy hamuru",
      "kıyma",
      "soğan",
      "bezelye",
      "havuç",
      "karabiber",
      "tuz",
      "yumurta sarısı"
    ]
  },
  {
    "id": "tr-120",
    "title": "Poğaça (Sade)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "süt",
      "sıvı yağ",
      "yumurta",
      "şeker",
      "tuz",
      "yumurta sarısı",
      "çörek otu"
    ]
  },
  {
    "id": "tr-121",
    "title": "Poğaça (Peynirli)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "süt",
      "sıvı yağ",
      "yumurta",
      "şeker",
      "tuz",
      "beyaz peynir",
      "maydanoz",
      "yumurta sarısı",
      "susam"
    ]
  },
  {
    "id": "tr-122",
    "title": "Poğaça (Patatesli)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "süt",
      "sıvı yağ",
      "yumurta",
      "şeker",
      "tuz",
      "patates",
      "soğan",
      "pul biber",
      "karabiber",
      "yumurta sarısı"
    ]
  },
  {
    "id": "tr-123",
    "title": "Açma",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "süt",
      "sıvı yağ",
      "tereyağı",
      "yumurta",
      "şeker",
      "tuz",
      "yumurta sarısı",
      "susam",
      "çörek otu"
    ]
  },
  {
    "id": "tr-124",
    "title": "Simit",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "su",
      "şeker",
      "tuz",
      "pekmez",
      "susam"
    ]
  },
  {
    "id": "tr-125",
    "title": "Pide (Kıymalı)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "su",
      "şeker",
      "tuz",
      "kıyma",
      "soğan",
      "domates",
      "yeşil biber",
      "maydanoz",
      "salça",
      "karabiber",
      "pul biber",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-126",
    "title": "Pide (Kaşarlı)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "su",
      "şeker",
      "tuz",
      "kaşar peyniri",
      "yumurta",
      "tereyağı"
    ]
  },
  {
    "id": "tr-127",
    "title": "Pide (Kuşbaşılı)",
    "cat": "corba",
    "ings": [
      "un",
      "maya",
      "su",
      "şeker",
      "tuz",
      "kuzu kuşbaşı",
      "dana kuşbaşı",
      "domates",
      "yeşil biber",
      "soğan",
      "karabiber",
      "pul biber",
      "tereyağı"
    ]
  },
  {
    "id": "tr-128",
    "title": "Bazlama",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "su",
      "yoğurt",
      "tuz",
      "şeker"
    ]
  },
  {
    "id": "tr-129",
    "title": "Katmer (Antep Usulü)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "su",
      "tuz",
      "kaymak",
      "antep fıstığı",
      "şeker",
      "tereyağı"
    ]
  },
  {
    "id": "tr-130",
    "title": "Pişi (Hamur Kızartması)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "su",
      "yoğurt",
      "tuz",
      "şeker",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-131",
    "title": "Lokma Tatlısı",
    "cat": "tatli",
    "ings": [
      "un",
      "maya",
      "su",
      "şeker",
      "tuz",
      "sıvı yağ",
      "şeker",
      "su",
      "limon suyu"
    ]
  },
  {
    "id": "tr-132",
    "title": "Kayseri Yağlaması",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "su",
      "maya",
      "tuz",
      "kıyma",
      "soğan",
      "sarımsak",
      "domates",
      "salça",
      "karabiber",
      "pul biber",
      "yoğurt"
    ]
  },
  {
    "id": "tr-133",
    "title": "Muhammara",
    "cat": "salata_meze",
    "ings": [
      "bayat ekmek içi",
      "ceviz",
      "biber salçası",
      "domates salçası",
      "sarımsak",
      "kimyon",
      "pul biber",
      "zeytinyağı",
      "nar ekşisi",
      "tuz"
    ]
  },
  {
    "id": "tr-134",
    "title": "Babagannuş",
    "cat": "salata_meze",
    "ings": [
      "patlıcan",
      "domates",
      "biber",
      "soğan",
      "sarımsak",
      "maydanoz",
      "zeytinyağı",
      "limon suyu",
      "nar ekşisi",
      "tuz",
      "pul biber"
    ]
  },
  {
    "id": "tr-135",
    "title": "Patlıcan Salatası (Közlenmiş)",
    "cat": "salata_meze",
    "ings": [
      "patlıcan",
      "sarımsak",
      "maydanoz",
      "zeytinyağı",
      "limon suyu",
      "tuz",
      "közlenmiş kırmızı biber",
      "sirke"
    ]
  },
  {
    "id": "tr-136",
    "title": "Yoğurtlu Patlıcan Salatası",
    "cat": "salata_meze",
    "ings": [
      "patlıcan",
      "yoğurt",
      "sarımsak",
      "tuz",
      "zeytinyağı",
      "ceviz",
      "maydanoz"
    ]
  },
  {
    "id": "tr-137",
    "title": "Atom Mezesi",
    "cat": "salata_meze",
    "ings": [
      "süzme yoğurt",
      "sarımsak",
      "kuru arnavut biberi",
      "tereyağı",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-138",
    "title": "Tarator (Havuçlu)",
    "cat": "salata_meze",
    "ings": [
      "havuç",
      "yoğurt",
      "sarımsak",
      "ceviz",
      "zeytinyağı",
      "tuz",
      "mayonez"
    ]
  },
  {
    "id": "tr-139",
    "title": "Tarator (Kabaklı)",
    "cat": "salata_meze",
    "ings": [
      "kabak",
      "yoğurt",
      "sarımsak",
      "ceviz",
      "dereotu",
      "zeytinyağı",
      "tuz"
    ]
  },
  {
    "id": "tr-140",
    "title": "Pancarlı Meze",
    "cat": "salata_meze",
    "ings": [
      "pancar",
      "yoğurt",
      "sarımsak",
      "ceviz",
      "tuz",
      "zeytinyağı"
    ]
  },
  {
    "id": "tr-141",
    "title": "Fava",
    "cat": "salata_meze",
    "ings": [
      "kuru bakla",
      "soğan",
      "zeytinyağı",
      "şeker",
      "tuz",
      "limon suyu",
      "dereotu",
      "su"
    ]
  },
  {
    "id": "tr-142",
    "title": "Kırmızı Lahana Salatası",
    "cat": "salata_meze",
    "ings": [
      "kırmızı lahana",
      "havuç",
      "mayonez",
      "yoğurt",
      "sirke",
      "tuz",
      "şeker",
      "dereotu",
      "mısır konservesi"
    ]
  },
  {
    "id": "tr-143",
    "title": "Ezme Salata (Sivri Biberli)",
    "cat": "salata_meze",
    "ings": [
      "domates",
      "sivri biber",
      "soğan",
      "sarımsak",
      "maydanoz",
      "salça",
      "zeytinyağı",
      "nar ekşisi",
      "pul biber",
      "nane",
      "tuz"
    ]
  },
  {
    "id": "tr-144",
    "title": "Mantar Salatası",
    "cat": "salata_meze",
    "ings": [
      "mantar",
      "mısır konservesi",
      "dereotu",
      "taze soğan",
      "közlenmiş kırmızı biber",
      "salatalık turşusu",
      "zeytinyağı",
      "limon suyu",
      "tuz"
    ]
  },
  {
    "id": "tr-145",
    "title": "Brokoli Salatası",
    "cat": "salata_meze",
    "ings": [
      "brokoli",
      "havuç",
      "mısır konservesi",
      "közlenmiş kırmızı biber",
      "yoğurt",
      "sarımsak",
      "mayonez",
      "zeytinyağı",
      "tuz"
    ]
  },
  {
    "id": "tr-146",
    "title": "Tahinli Piyaz",
    "cat": "salata_meze",
    "ings": [
      "kuru fasulye",
      "tahin",
      "limon suyu",
      "sirke",
      "sarımsak",
      "su",
      "kimyon",
      "tuz",
      "kırmızı soğan",
      "domates",
      "maydanoz",
      "yumurta",
      "zeytinyağı"
    ]
  },
  {
    "id": "tr-147",
    "title": "Cacık",
    "cat": "salata_meze",
    "ings": [
      "salatalık",
      "yoğurt",
      "sarımsak",
      "su",
      "nane",
      "dereotu",
      "zeytinyağı",
      "tuz"
    ]
  },
  {
    "id": "tr-148",
    "title": "Tebbule (Tabule)",
    "cat": "salata_meze",
    "ings": [
      "köftelik bulgur",
      "domates",
      "salatalık",
      "taze soğan",
      "maydanoz",
      "nane",
      "zeytinyağı",
      "limon suyu",
      "tuz"
    ]
  },
  {
    "id": "tr-149",
    "title": "Güllaç",
    "cat": "tatli",
    "ings": [
      "güllaç yaprağı",
      "süt",
      "şeker",
      "vanilya",
      "gül suyu",
      "ceviz",
      "nar",
      "antep fıstığı"
    ]
  },
  {
    "id": "tr-150",
    "title": "Şekerpare",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "margarin",
      "pudra şekeri",
      "yumurta",
      "irmik",
      "un",
      "kabartma tozu",
      "vanilya",
      "fındık",
      "badem",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-151",
    "title": "Kalburabastı",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "sıvı yağ",
      "yoğurt",
      "yumurta",
      "irmik",
      "un",
      "kabartma tozu",
      "vanilya",
      "ceviz",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-152",
    "title": "Künefe",
    "cat": "tatli",
    "ings": [
      "tel kadayıf",
      "künefe peyniri",
      "tereyağı",
      "pekmez",
      "su",
      "şeker",
      "limon suyu",
      "antep fıstığı"
    ]
  },
  {
    "id": "tr-153",
    "title": "Kemalpaşa Tatlısı",
    "cat": "tatli",
    "ings": [
      "hazır kemalpaşa tatlısı",
      "su",
      "şeker",
      "limon suyu",
      "kaymak",
      "hindistan cevizi",
      "antep fıstığı"
    ]
  },
  {
    "id": "tr-154",
    "title": "Vezir Parmağı Tatlısı",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "sıvı yağ",
      "yoğurt",
      "yumurta",
      "irmik",
      "un",
      "kabartma tozu",
      "vanilya",
      "su",
      "şeker",
      "limon suyu",
      "hindistan cevizi"
    ]
  },
  {
    "id": "tr-155",
    "title": "Hanım Göbeği Tatlısı",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "su",
      "un",
      "yumurta",
      "irmik",
      "nişasta",
      "tuz",
      "sıvı yağ",
      "şeker",
      "su",
      "limon suyu"
    ]
  },
  {
    "id": "tr-156",
    "title": "Dilber Dudağı Tatlısı",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "sıvı yağ",
      "yoğurt",
      "yumurta",
      "sirke",
      "kabartma tozu",
      "un",
      "nişasta",
      "ceviz",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-157",
    "title": "Tulumba Tatlısı",
    "cat": "tatli",
    "ings": [
      "su",
      "tereyağı",
      "tuz",
      "şeker",
      "un",
      "yumurta",
      "irmik",
      "nişasta",
      "limon suyu",
      "sıvı yağ",
      "şeker",
      "su",
      "limon suyu"
    ]
  },
  {
    "id": "tr-158",
    "title": "Baklava (Hazır Yufkadan)",
    "cat": "tatli",
    "ings": [
      "baklavalık yufka",
      "ceviz",
      "fındık",
      "antep fıstığı",
      "tereyağı",
      "sıvı yağ",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-159",
    "title": "Cevizli Ev Baklavası",
    "cat": "tatli",
    "ings": [
      "un",
      "yumurta",
      "yoğurt",
      "sıvı yağ",
      "sirke",
      "tuz",
      "su",
      "nişasta",
      "ceviz",
      "tereyağı",
      "şeker",
      "su",
      "limon suyu"
    ]
  },
  {
    "id": "tr-160",
    "title": "Soğuk Baklava",
    "cat": "tatli",
    "ings": [
      "baklavalık yufka",
      "tereyağı",
      "süt",
      "şeker",
      "kakao",
      "çikolata",
      "ceviz",
      "fındık",
      "antep fıstığı"
    ]
  },
  {
    "id": "tr-161",
    "title": "Şöbiyet",
    "cat": "tatli",
    "ings": [
      "baklavalık yufka",
      "süt",
      "irmik",
      "şeker",
      "kaymak",
      "antep fıstığı",
      "tereyağı",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-162",
    "title": "İncir Uyutması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kuru incir",
      "süt",
      "ceviz"
    ]
  },
  {
    "id": "tr-163",
    "title": "Kabak Tatlısı",
    "cat": "tatli",
    "ings": [
      "balkabağı",
      "şeker",
      "ceviz",
      "tahin"
    ]
  },
  {
    "id": "tr-164",
    "title": "Ayva Tatlısı",
    "cat": "tatli",
    "ings": [
      "ayva",
      "şeker",
      "su",
      "karanfil",
      "tarçın",
      "vişne",
      "kaymak",
      "ceviz"
    ]
  },
  {
    "id": "tr-165",
    "title": "Zerde",
    "cat": "tatli",
    "ings": [
      "pirinç",
      "su",
      "şeker",
      "nişasta",
      "zerdeçal",
      "safran",
      "gül suyu",
      "kuş üzümü",
      "çam fıstığı",
      "nar"
    ]
  },
  {
    "id": "tr-166",
    "title": "Supangle",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "un",
      "nişasta",
      "kakao",
      "yumurta sarısı",
      "tereyağı",
      "çikolata",
      "kek parçası",
      "hindistan cevizi"
    ]
  },
  {
    "id": "tr-167",
    "title": "Keşkül",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "pirinç unu",
      "nişasta",
      "badem unu",
      "hindistan cevizi",
      "vanilya",
      "badem",
      "antep fıstığı"
    ]
  },
  {
    "id": "tr-168",
    "title": "Tavuk Göğsü Tatlısı (Yalancı)",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "un",
      "nişasta",
      "tereyağı",
      "margarin",
      "vanilya",
      "damla sakızı",
      "tarçın"
    ]
  },
  {
    "id": "tr-169",
    "title": "Magnolia Puding",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "un",
      "nişasta",
      "yumurta sarısı",
      "vanilya",
      "krema",
      "bebe bisküvisi",
      "çilek",
      "muz"
    ]
  },
  {
    "id": "tr-170",
    "title": "Trileçe",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "şeker",
      "un",
      "kabartma tozu",
      "vanilya",
      "süt",
      "krema",
      "şekerli yoğunlaştırılmış süt",
      "karamel sos"
    ]
  },
  {
    "id": "tr-171",
    "title": "Mozaik Pasta",
    "cat": "tatli",
    "ings": [
      "petibör bisküvi",
      "tereyağı",
      "margarin",
      "süt",
      "şeker",
      "kakao",
      "ceviz",
      "fındık"
    ]
  },
  {
    "id": "tr-172",
    "title": "Haşhaşlı Revani",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "şeker",
      "yoğurt",
      "sıvı yağ",
      "irmik",
      "un",
      "haşhaş tohumu",
      "kabartma tozu",
      "vanilya",
      "su",
      "şeker",
      "limon suyu",
      "krem şanti",
      "süt"
    ]
  },
  {
    "id": "tr-173",
    "title": "Muhallebi (Basit)",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "un",
      "nişasta",
      "vanilya",
      "tereyağı"
    ]
  },
  {
    "id": "tr-174",
    "title": "Sakızlı Muhallebi",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "pirinç unu",
      "nişasta",
      "damla sakızı",
      "vanilya"
    ]
  },
  {
    "id": "tr-175",
    "title": "Pekmezli Un Helvası",
    "cat": "tatli",
    "ings": [
      "un",
      "tereyağı",
      "sıvı yağ",
      "pekmez",
      "su",
      "ceviz"
    ]
  },
  {
    "id": "tr-176",
    "title": "Sucuklu Yumurta",
    "cat": "kahvalti",
    "ings": [
      "sucuk",
      "yumurta",
      "tereyağı",
      "sıvı yağ",
      "pul biber"
    ]
  },
  {
    "id": "tr-177",
    "title": "Pastırmalı Yumurta",
    "cat": "kahvalti",
    "ings": [
      "pastırma",
      "yumurta",
      "tereyağı"
    ]
  },
  {
    "id": "tr-178",
    "title": "Kuymak (Mıhlama)",
    "cat": "kahvalti",
    "ings": [
      "mısır unu",
      "tereyağı",
      "çeçil peyniri",
      "telli peynir",
      "su",
      "tuz"
    ]
  },
  {
    "id": "tr-179",
    "title": "Domatesli Biber Kavurması",
    "cat": "et_tavuk",
    "ings": [
      "yeşil biber",
      "domates",
      "soğan",
      "sarımsak",
      "sıvı yağ",
      "tuz",
      "pul biber"
    ]
  },
  {
    "id": "tr-180",
    "title": "Yumurtalı Ekmek (Fransız Tostu)",
    "cat": "hamur_borek",
    "ings": [
      "bayat ekmek",
      "yumurta",
      "süt",
      "tuz",
      "tereyağı",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-181",
    "title": "Akıtma (Krep)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "yumurta",
      "süt",
      "su",
      "tuz",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-182",
    "title": "Patatesli Omlet",
    "cat": "kahvalti",
    "ings": [
      "patates",
      "yumurta",
      "soğan",
      "kaşar peyniri",
      "maydanoz",
      "sıvı yağ",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-183",
    "title": "Mantarlı Omlet",
    "cat": "kahvalti",
    "ings": [
      "mantar",
      "yumurta",
      "soğan",
      "sarımsak",
      "tereyağı",
      "kaşar peyniri",
      "maydanoz",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-184",
    "title": "Peynirli Omlet",
    "cat": "kahvalti",
    "ings": [
      "yumurta",
      "beyaz peynir",
      "kaşar peyniri",
      "tereyağı",
      "maydanoz",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-185",
    "title": "Silor (Siron)",
    "cat": "hamur_borek",
    "ings": [
      "hazır yufka",
      "tereyağı",
      "yoğurt",
      "sarımsak",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-186",
    "title": "Turşu Kavurması",
    "cat": "salata_meze",
    "ings": [
      "fasulye turşusu",
      "soğan",
      "mısır unu",
      "sıvı yağ",
      "pul biber"
    ]
  },
  {
    "id": "tr-187",
    "title": "Çılbır",
    "cat": "kahvalti",
    "ings": [
      "yumurta",
      "yoğurt",
      "sarımsak",
      "sirke",
      "tereyağı",
      "pul biber",
      "nane",
      "tuz"
    ]
  },
  {
    "id": "tr-188",
    "title": "Yoğurtlu Biber Kavurması",
    "cat": "et_tavuk",
    "ings": [
      "sivri biber",
      "çarliston biber",
      "sıvı yağ",
      "yoğurt",
      "sarımsak",
      "tuz"
    ]
  },
  {
    "id": "tr-189",
    "title": "Abant Kebabı",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "bonfile",
      "mantar",
      "krema",
      "kaşar peyniri",
      "patlıcan",
      "tereyağı",
      "un",
      "süt",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-190",
    "title": "Soğanlama (Soğan Dolması benzeri)",
    "cat": "et_tavuk",
    "ings": [
      "kuru soğan",
      "kıyma",
      "pirinç",
      "maydanoz",
      "salça",
      "nar ekşisi",
      "nane",
      "pul biber",
      "karabiber",
      "tuz",
      "sıvı yağ",
      "su"
    ]
  },
  {
    "id": "tr-191",
    "title": "Zeytinyağlı Yer Elması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "yer elması",
      "havuç",
      "portakal suyu",
      "zeytinyağı",
      "soğan",
      "dereotu",
      "tuz",
      "şeker"
    ]
  },
  {
    "id": "tr-192",
    "title": "Sütlü Biber Turşusu Kavurması",
    "cat": "salata_meze",
    "ings": [
      "sütlü biber turşusu",
      "soğan",
      "sarımsak",
      "domates",
      "sıvı yağ",
      "pul biber"
    ]
  },
  {
    "id": "tr-193",
    "title": "Isırgan Otu Çorbası",
    "cat": "corba",
    "ings": [
      "ısırgan otu",
      "soğan",
      "mısır unu",
      "tereyağı",
      "pul biber",
      "tuz",
      "su"
    ]
  },
  {
    "id": "tr-194",
    "title": "Mısır Ekmeği",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "mısır unu",
      "buğday unu",
      "yoğurt",
      "sıvı yağ",
      "su",
      "kabartma tozu",
      "tuz",
      "şeker"
    ]
  },
  {
    "id": "tr-195",
    "title": "Hamsili Pilav",
    "cat": "bakliyat_pilav",
    "ings": [
      "hamsi",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "maydanoz",
      "dereotu",
      "nane",
      "karabiber",
      "yenibahar",
      "tuz",
      "sıvı yağ",
      "limon"
    ]
  },
  {
    "id": "tr-196",
    "title": "Hamsi Tava",
    "cat": "et_tavuk",
    "ings": [
      "hamsi",
      "mısır unu",
      "tuz",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-197",
    "title": "Fırında Hamsi Buğulama",
    "cat": "et_tavuk",
    "ings": [
      "hamsi",
      "soğan",
      "domates",
      "limon",
      "maydanoz",
      "defne yaprağı",
      "zeytinyağı",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-198",
    "title": "Palamut Pilaki",
    "cat": "et_tavuk",
    "ings": [
      "palamut",
      "soğan",
      "domates",
      "sarımsak",
      "patates",
      "havuç",
      "defne yaprağı",
      "maydanoz",
      "zeytinyağı",
      "limon",
      "tuz",
      "karabiber",
      "su"
    ]
  },
  {
    "id": "tr-199",
    "title": "Kağıtta Levrek",
    "cat": "et_tavuk",
    "ings": [
      "levrek fileto",
      "domates",
      "limon",
      "soğan",
      "sarımsak",
      "biberiye",
      "kekik",
      "defne yaprağı",
      "zeytinyağı",
      "tereyağı",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-200",
    "title": "Midye Dolma",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "midye",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "yenibahar",
      "karabiber",
      "tarçın",
      "şeker",
      "tuz",
      "zeytinyağı",
      "dereotu",
      "limon"
    ]
  },
  {
    "id": "tr-201",
    "title": "Şeftali Kebabı (Kıbrıs)",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kıyma",
      "kuzu gömlek yağı",
      "soğan",
      "maydanoz",
      "galeta unu",
      "kimyon",
      "karabiber",
      "tuz"
    ]
  },
  {
    "id": "tr-202",
    "title": "Bumbar Dolması",
    "cat": "et_tavuk",
    "ings": [
      "kuzu bumbar",
      "pirinç",
      "bulgur",
      "kıyma",
      "soğan",
      "sarımsak",
      "salça",
      "biber salçası",
      "nane",
      "reyhan",
      "maydanoz",
      "karabiber",
      "pul biber",
      "tuz",
      "sıvı yağ",
      "su"
    ]
  },
  {
    "id": "tr-203",
    "title": "Şırdan Dolması",
    "cat": "et_tavuk",
    "ings": [
      "kuzu şırdan",
      "pirinç",
      "kıyma",
      "soğan",
      "salça",
      "karabiber",
      "pul biber",
      "kimyon",
      "tuz",
      "su"
    ]
  },
  {
    "id": "tr-204",
    "title": "Analı Kızlı Çorbası",
    "cat": "corba",
    "ings": [
      "köftelik bulgur",
      "irmik",
      "un",
      "kıyma",
      "soğan",
      "salça",
      "biber salçası",
      "nohut",
      "et suyu",
      "tereyağı",
      "nane",
      "pul biber",
      "limon suyu",
      "tuz"
    ]
  },
  {
    "id": "tr-205",
    "title": "Patlıcanlı Pilav",
    "cat": "bakliyat_pilav",
    "ings": [
      "pirinç",
      "patlıcan",
      "soğan",
      "domates",
      "yeşil biber",
      "kuzu kuşbaşı",
      "tereyağı",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "et suyu"
    ]
  },
  {
    "id": "tr-206",
    "title": "Özbek Pilavı",
    "cat": "bakliyat_pilav",
    "ings": [
      "pirinç",
      "kuzu kuşbaşı",
      "havuç",
      "soğan",
      "sarımsak",
      "nohut",
      "kuru üzüm",
      "kimyon",
      "zerdeçal",
      "karabiber",
      "tuz",
      "sıvı yağ",
      "su"
    ]
  },
  {
    "id": "tr-207",
    "title": "Tokat Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "patlıcan",
      "patates",
      "domates",
      "yeşil biber",
      "sarımsak",
      "kuyruk yağı",
      "tereyağı",
      "tuz"
    ]
  },
  {
    "id": "tr-208",
    "title": "Cağ Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "kuzu eti",
      "soğan",
      "yoğurt",
      "karabiber",
      "pul biber",
      "tuz",
      "lavaş ekmeği"
    ]
  },
  {
    "id": "tr-209",
    "title": "Büryan Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "kuzu eti",
      "tuz",
      "pide ekmeği"
    ]
  },
  {
    "id": "tr-210",
    "title": "Testi Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "dana kuşbaşı",
      "domates",
      "yeşil biber",
      "soğan",
      "sarımsak",
      "tereyağı",
      "tuz",
      "karabiber",
      "kekik",
      "defne yaprağı"
    ]
  },
  {
    "id": "tr-211",
    "title": "Ayvalı Kuzu İncik",
    "cat": "et_tavuk",
    "ings": [
      "kuzu incik",
      "ayva",
      "soğan",
      "havuç",
      "kereviz",
      "kuru kayısı",
      "kuru erik",
      "bal",
      "tarçın",
      "zencefil",
      "et suyu",
      "tereyağı",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-212",
    "title": "Kayısılı Kuzu Yahnisi",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "kuru kayısı",
      "soğan",
      "badem",
      "bal",
      "tarçın",
      "safran",
      "et suyu",
      "tereyağı",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-213",
    "title": "Pekmezli Ayva Dolması",
    "cat": "et_tavuk",
    "ings": [
      "ayva",
      "kıyma",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "tarçın",
      "yenibahar",
      "pekmez",
      "tereyağı",
      "su",
      "tuz"
    ]
  },
  {
    "id": "tr-214",
    "title": "Bademli Tavuk",
    "cat": "et_tavuk",
    "ings": [
      "tavuk göğsü",
      "badem",
      "soğan",
      "bal",
      "safran",
      "zerdeçal",
      "zencefil",
      "tavuk suyu",
      "krema",
      "tereyağı",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-215",
    "title": "Mutancana",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "kuru kayısı",
      "kuru erik",
      "kuru incir",
      "badem",
      "soğan",
      "bal",
      "sumak",
      "et suyu",
      "tereyağı",
      "tuz"
    ]
  },
  {
    "id": "tr-216",
    "title": "Vişneli Yaprak Sarma",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "asma yaprağı",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "zeytinyağı",
      "nane",
      "tarçın",
      "şeker",
      "tuz",
      "vişne",
      "su"
    ]
  },
  {
    "id": "tr-217",
    "title": "Höşmerim",
    "cat": "tatli",
    "ings": [
      "taze peynir",
      "irmik",
      "şeker",
      "yumurta sarısı",
      "tereyağı"
    ]
  },
  {
    "id": "tr-218",
    "title": "Nevzine Tatlısı",
    "cat": "tatli",
    "ings": [
      "un",
      "tereyağı",
      "sıvı yağ",
      "yoğurt",
      "yumurta",
      "kabartma tozu",
      "sirke",
      "ceviz",
      "pekmez",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-219",
    "title": "Peynir Helvası (Tekirdağ)",
    "cat": "tatli",
    "ings": [
      "tuzsuz peynir",
      "irmik",
      "un",
      "şeker",
      "yumurta sarısı"
    ]
  },
  {
    "id": "tr-220",
    "title": "Laz Böreği",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "baklavalık yufka",
      "tereyağı",
      "süt",
      "un",
      "şeker",
      "yumurta",
      "karabiber",
      "vanilya",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-221",
    "title": "Samsades (Bademli Tatlı)",
    "cat": "tatli",
    "ings": [
      "un",
      "zeytinyağı",
      "su",
      "tuz",
      "badem",
      "şeker",
      "tarçın",
      "sıvı yağ",
      "şeker",
      "su",
      "limon suyu"
    ]
  },
  {
    "id": "tr-222",
    "title": "Zeruze",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kuru kayısı",
      "ceviz",
      "pekmez",
      "tereyağı"
    ]
  },
  {
    "id": "tr-223",
    "title": "Mısır Unu Helvası",
    "cat": "tatli",
    "ings": [
      "mısır unu",
      "tereyağı",
      "pekmez",
      "şeker",
      "süt",
      "su",
      "ceviz"
    ]
  },
  {
    "id": "tr-224",
    "title": "Gelin Çantası Pastası",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "şeker",
      "süt",
      "sıvı yağ",
      "un",
      "kakao",
      "kabartma tozu",
      "vanilya",
      "krem şanti",
      "süt",
      "hindistan cevizi"
    ]
  },
  {
    "id": "tr-225",
    "title": "Kerebiç",
    "cat": "tatli",
    "ings": [
      "irmik",
      "un",
      "tereyağı",
      "sıvı yağ",
      "yoğurt",
      "kabartma tozu",
      "antep fıstığı",
      "pudra şekeri",
      "çöven otu kökü",
      "şeker",
      "su"
    ]
  },
  {
    "id": "tr-226",
    "title": "Zeytinli Açma",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "süt",
      "sıvı yağ",
      "tereyağı",
      "yumurta",
      "şeker",
      "tuz",
      "siyah zeytin ezmesi",
      "yeşil zeytin",
      "kekik",
      "yumurta sarısı"
    ]
  },
  {
    "id": "tr-227",
    "title": "Dereotlu Poğaça",
    "cat": "hamur_borek",
    "ings": [
      "tereyağı",
      "sıvı yağ",
      "yoğurt",
      "yumurta",
      "sirke",
      "un",
      "kabartma tozu",
      "tuz",
      "dereotu",
      "beyaz peynir",
      "yumurta sarısı",
      "çörek otu"
    ]
  },
  {
    "id": "tr-228",
    "title": "Kaşarlı Simit Poğaça",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "süt",
      "su",
      "sıvı yağ",
      "şeker",
      "tuz",
      "kaşar peyniri",
      "pekmez",
      "susam"
    ]
  },
  {
    "id": "tr-229",
    "title": "Patlıcan Reçeli",
    "cat": "tatli",
    "ings": [
      "küçük patlıcan",
      "şeker",
      "su",
      "limon tuzu",
      "karanfil",
      "badem"
    ]
  },
  {
    "id": "tr-230",
    "title": "Turunç Reçeli",
    "cat": "tatli",
    "ings": [
      "turunç kabuğu",
      "şeker",
      "su",
      "limon suyu"
    ]
  },
  {
    "id": "tr-231",
    "title": "İncir Reçeli",
    "cat": "tatli",
    "ings": [
      "taze incir",
      "şeker",
      "su",
      "limon suyu",
      "karanfil"
    ]
  },
  {
    "id": "tr-232",
    "title": "Çilek Reçeli",
    "cat": "tatli",
    "ings": [
      "çilek",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-233",
    "title": "Vişne Reçeli",
    "cat": "tatli",
    "ings": [
      "vişne",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-234",
    "title": "Gül Reçeli",
    "cat": "tatli",
    "ings": [
      "kokulu gül yaprağı",
      "şeker",
      "su",
      "limon tuzu"
    ]
  },
  {
    "id": "tr-235",
    "title": "Domates Reçeli",
    "cat": "tatli",
    "ings": [
      "kiraz domates",
      "şeker",
      "su",
      "limon tuzu",
      "badem"
    ]
  },
  {
    "id": "tr-236",
    "title": "Erik Marmelatı",
    "cat": "tatli",
    "ings": [
      "kırmızı erik",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-237",
    "title": "Kayısı Marmelatı",
    "cat": "tatli",
    "ings": [
      "kayısı",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-238",
    "title": "Kızılcık Marmelatı",
    "cat": "tatli",
    "ings": [
      "kızılcık",
      "şeker",
      "su"
    ]
  },
  {
    "id": "tr-239",
    "title": "Kuşburnu Marmelatı",
    "cat": "tatli",
    "ings": [
      "kuşburnu",
      "şeker",
      "su"
    ]
  },
  {
    "id": "tr-240",
    "title": "Demirhindi Şerbeti",
    "cat": "tatli",
    "ings": [
      "demirhindi",
      "su",
      "şeker",
      "tarçın",
      "karanfil",
      "zencefil"
    ]
  },
  {
    "id": "tr-241",
    "title": "Gül Şerbeti",
    "cat": "tatli",
    "ings": [
      "gül yaprağı",
      "su",
      "şeker",
      "limon tuzu"
    ]
  },
  {
    "id": "tr-242",
    "title": "Lohusa Şerbeti (Kızamık Şekeri)",
    "cat": "tatli",
    "ings": [
      "kızamık şekeri",
      "su",
      "tarçın",
      "karanfil",
      "zencefil"
    ]
  },
  {
    "id": "tr-243",
    "title": "Reyhan Şerbeti",
    "cat": "tatli",
    "ings": [
      "reyhan",
      "su",
      "şeker",
      "limon",
      "tarçın",
      "karanfil"
    ]
  },
  {
    "id": "tr-244",
    "title": "Koruk Suyu",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "koruk üzümü",
      "su",
      "şeker"
    ]
  },
  {
    "id": "tr-245",
    "title": "Şalgam Suyu (Ev Yapımı)",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "siyah havuç",
      "şalgam turpu",
      "bulgur",
      "maya",
      "tuz",
      "su"
    ]
  },
  {
    "id": "tr-246",
    "title": "Boza",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "bulgur",
      "pirinç",
      "mısır unu",
      "maya",
      "şeker",
      "su",
      "tarçın",
      "leblebi"
    ]
  },
  {
    "id": "tr-247",
    "title": "Sirkeli Biber Turşusu",
    "cat": "salata_meze",
    "ings": [
      "sivri biber",
      "cin biber",
      "sirke",
      "su",
      "kaya tuzu",
      "sarımsak",
      "nohut"
    ]
  },
  {
    "id": "tr-248",
    "title": "Salatalık Turşusu (Kornişon)",
    "cat": "salata_meze",
    "ings": [
      "kornişon salatalık",
      "sirke",
      "su",
      "kaya tuzu",
      "sarımsak",
      "dereotu",
      "defne yaprağı",
      "tane karabiber",
      "nohut"
    ]
  },
  {
    "id": "tr-249",
    "title": "Karışık Turşu",
    "cat": "salata_meze",
    "ings": [
      "salatalık",
      "havuç",
      "beyaz lahana",
      "karnabahar",
      "yeşil domates",
      "biber",
      "sirke",
      "su",
      "kaya tuzu",
      "sarımsak",
      "maydanoz",
      "kereviz yaprağı",
      "nohut"
    ]
  },
  {
    "id": "tr-250",
    "title": "Pancar Turşusu",
    "cat": "salata_meze",
    "ings": [
      "pancar",
      "sirke",
      "su",
      "kaya tuzu",
      "sarımsak",
      "şeker"
    ]
  },
  {
    "id": "tr-251",
    "title": "Ezogelin Köftesi",
    "cat": "et_tavuk",
    "ings": [
      "kırmızı mercimek",
      "köftelik bulgur",
      "soğan",
      "salça",
      "biber salçası",
      "un",
      "yumurta",
      "kimyon",
      "pul biber",
      "tuz",
      "maydanoz",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-252",
    "title": "Peynirli İrmik Helvası",
    "cat": "tatli",
    "ings": [
      "irmik",
      "tereyağı",
      "tuzsuz peynir",
      "süt",
      "su",
      "şeker"
    ]
  },
  {
    "id": "tr-253",
    "title": "Yoğurt Tatlısı",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "şeker",
      "yoğurt",
      "sıvı yağ",
      "un",
      "kabartma tozu",
      "vanilya",
      "limon kabuğu rendesi",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-254",
    "title": "Paşa Lokumu",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "un",
      "nişasta",
      "tereyağı",
      "vanilya",
      "hindistan cevizi",
      "krem şanti",
      "ceviz"
    ]
  },
  {
    "id": "tr-255",
    "title": "Kaşık Dökmesi",
    "cat": "corba",
    "ings": [
      "yumurta",
      "yoğurt",
      "un",
      "kabartma tozu",
      "tuz",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-256",
    "title": "Cevizli Sucuk (Köme)",
    "cat": "tatli",
    "ings": [
      "ceviz",
      "pekmez",
      "su",
      "nişasta",
      "un",
      "şeker"
    ]
  },
  {
    "id": "tr-257",
    "title": "Pestil",
    "cat": "tatli",
    "ings": [
      "dut",
      "kayısı",
      "erik",
      "pekmez",
      "nişasta",
      "su",
      "ceviz"
    ]
  },
  {
    "id": "tr-258",
    "title": "Zeytinyağlı Enginar Kalbi",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "enginar kalbi",
      "bezelye",
      "havuç",
      "patates",
      "soğan",
      "dereotu",
      "zeytinyağı",
      "limon suyu",
      "portakal suyu",
      "tuz",
      "şeker"
    ]
  },
  {
    "id": "tr-259",
    "title": "Kapuska",
    "cat": "et_tavuk",
    "ings": [
      "beyaz lahana",
      "kıyma",
      "soğan",
      "pirinç",
      "bulgur",
      "salça",
      "biber salçası",
      "sıvı yağ",
      "pul biber",
      "karabiber",
      "tuz",
      "su"
    ]
  },
  {
    "id": "tr-260",
    "title": "Etli Kuru Dolma (Patlıcan, Biber)",
    "cat": "et_tavuk",
    "ings": [
      "kuru patlıcan",
      "kuru biber",
      "kıyma",
      "pirinç",
      "bulgur",
      "soğan",
      "sarımsak",
      "maydanoz",
      "salça",
      "biber salçası",
      "nane",
      "sumak",
      "nar ekşisi",
      "zeytinyağı",
      "tuz",
      "karabiber",
      "pul biber",
      "su"
    ]
  },
  {
    "id": "tr-261",
    "title": "Zeytinyağlı Kuru Dolma (Patlıcan, Biber)",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kuru patlıcan",
      "kuru biber",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "nane",
      "tarçın",
      "yenibahar",
      "şeker",
      "zeytinyağı",
      "nar ekşisi",
      "limon suyu",
      "tuz",
      "su"
    ]
  },
  {
    "id": "tr-262",
    "title": "Biber Dolması (Etli)",
    "cat": "et_tavuk",
    "ings": [
      "dolmalık biber",
      "kıyma",
      "pirinç",
      "soğan",
      "domates",
      "maydanoz",
      "nane",
      "salça",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "su"
    ]
  },
  {
    "id": "tr-263",
    "title": "Zeytinyağlı Biber Dolması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "dolmalık biber",
      "pirinç",
      "soğan",
      "domates",
      "kuş üzümü",
      "çam fıstığı",
      "nane",
      "dereotu",
      "tarçın",
      "yenibahar",
      "şeker",
      "zeytinyağı",
      "tuz",
      "su",
      "limon"
    ]
  },
  {
    "id": "tr-264",
    "title": "Kabak Dolması (Etli)",
    "cat": "et_tavuk",
    "ings": [
      "kabak",
      "kıyma",
      "pirinç",
      "soğan",
      "domates",
      "dereotu",
      "nane",
      "salça",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "su"
    ]
  },
  {
    "id": "tr-265",
    "title": "Zeytinyağlı Kabak Dolması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kabak",
      "pirinç",
      "soğan",
      "domates",
      "kuş üzümü",
      "çam fıstığı",
      "dereotu",
      "nane",
      "şeker",
      "zeytinyağı",
      "tuz",
      "su",
      "limon"
    ]
  },
  {
    "id": "tr-266",
    "title": "Lahana Sarması (Etli)",
    "cat": "et_tavuk",
    "ings": [
      "beyaz lahana",
      "kıyma",
      "pirinç",
      "bulgur",
      "soğan",
      "maydanoz",
      "nane",
      "salça",
      "biber salçası",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "pul biber",
      "su"
    ]
  },
  {
    "id": "tr-267",
    "title": "Zeytinyağlı Lahana Sarması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "beyaz lahana",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "nane",
      "tarçın",
      "yenibahar",
      "şeker",
      "zeytinyağı",
      "tuz",
      "su",
      "limon"
    ]
  },
  {
    "id": "tr-268",
    "title": "Pazı Sarması (Etli)",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "pazı",
      "kıyma",
      "pirinç",
      "bulgur",
      "soğan",
      "maydanoz",
      "salça",
      "sıvı yağ",
      "tuz",
      "karabiber",
      "pul biber",
      "yoğurt",
      "su"
    ]
  },
  {
    "id": "tr-269",
    "title": "Zeytinyağlı Pazı Sarması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "pazı",
      "pirinç",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "dereotu",
      "nane",
      "zeytinyağı",
      "tuz",
      "şeker",
      "limon suyu",
      "su"
    ]
  },
  {
    "id": "tr-270",
    "title": "Etli Ekmek (Konya)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "su",
      "tuz",
      "kıyma",
      "soğan",
      "domates",
      "yeşil biber",
      "maydanoz",
      "karabiber",
      "tuz"
    ]
  },
  {
    "id": "tr-271",
    "title": "Bıçak Arası Pide",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "maya",
      "su",
      "tuz",
      "kuzu eti",
      "domates",
      "yeşil biber",
      "maydanoz",
      "karabiber",
      "pul biber",
      "tereyağı"
    ]
  },
  {
    "id": "tr-272",
    "title": "Tirit",
    "cat": "et_tavuk",
    "ings": [
      "bayat pide ekmeği",
      "kuzu eti",
      "et suyu",
      "yoğurt",
      "sarımsak",
      "tereyağı",
      "pul biber",
      "nane",
      "sumak"
    ]
  },
  {
    "id": "tr-273",
    "title": "Papara",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "bayat ekmek",
      "tereyağı",
      "peynir",
      "salça",
      "pul biber",
      "nane",
      "su"
    ]
  },
  {
    "id": "tr-274",
    "title": "Sıkma (Yörük Dürümü)",
    "cat": "hamur_borek",
    "ings": [
      "un",
      "su",
      "tuz",
      "lor peyniri",
      "maydanoz",
      "soğan",
      "pul biber",
      "tereyağı"
    ]
  },
  {
    "id": "tr-275",
    "title": "Tandır Böreği",
    "cat": "et_tavuk",
    "ings": [
      "hazır yufka",
      "kıyma",
      "soğan",
      "ceviz",
      "karabiber",
      "tuz",
      "yumurta",
      "süt",
      "yoğurt",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-276",
    "title": "Avcı Böreği",
    "cat": "et_tavuk",
    "ings": [
      "hazır yufka",
      "kıyma",
      "bulgur",
      "ceviz",
      "soğan",
      "maydanoz",
      "karabiber",
      "pul biber",
      "tuz",
      "yumurta",
      "galeta unu",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-277",
    "title": "Balık Ekmek",
    "cat": "hamur_borek",
    "ings": [
      "uskumru",
      "palamut",
      "istavrit",
      "ekmek",
      "marul",
      "soğan",
      "domates",
      "limon",
      "tuz"
    ]
  },
  {
    "id": "tr-278",
    "title": "Karides Güveç",
    "cat": "et_tavuk",
    "ings": [
      "karides",
      "mantar",
      "domates",
      "yeşil biber",
      "soğan",
      "sarımsak",
      "tereyağı",
      "kaşar peyniri",
      "pul biber",
      "kekik",
      "tuz"
    ]
  },
  {
    "id": "tr-279",
    "title": "Kalamar Tava",
    "cat": "et_tavuk",
    "ings": [
      "kalamar",
      "un",
      "karbonat",
      "şeker",
      "tuz",
      "limon",
      "sıvı yağ",
      "tarator sos"
    ]
  },
  {
    "id": "tr-280",
    "title": "Lakerda",
    "cat": "salata_meze",
    "ings": [
      "palamut",
      "torik",
      "kaya tuzu",
      "defne yaprağı",
      "kırmızı soğan",
      "zeytinyağı"
    ]
  },
  {
    "id": "tr-281",
    "title": "Topik",
    "cat": "salata_meze",
    "ings": [
      "nohut",
      "patates",
      "soğan",
      "tahin",
      "çam fıstığı",
      "kuş üzümü",
      "tarçın",
      "yenibahar",
      "şeker",
      "tuz"
    ]
  },
  {
    "id": "tr-282",
    "title": "Çılbır (Pastırmalı)",
    "cat": "kahvalti",
    "ings": [
      "yumurta",
      "yoğurt",
      "sarımsak",
      "sirke",
      "pastırma",
      "tereyağı",
      "pul biber",
      "nane",
      "tuz"
    ]
  },
  {
    "id": "tr-283",
    "title": "Kaygana",
    "cat": "hamur_borek",
    "ings": [
      "yumurta",
      "un",
      "süt",
      "su",
      "maydanoz",
      "dereotu",
      "taze soğan",
      "tuz",
      "karabiber",
      "tereyağı",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-284",
    "title": "Un Kurabiyesi",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "margarin",
      "sıvı yağ",
      "pudra şekeri",
      "nişasta",
      "un",
      "vanilya"
    ]
  },
  {
    "id": "tr-285",
    "title": "Elmalı Kurabiye",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "margarin",
      "yoğurt",
      "sıvı yağ",
      "yumurta",
      "pudra şekeri",
      "un",
      "kabartma tozu",
      "vanilya",
      "elma",
      "şeker",
      "tarçın",
      "ceviz"
    ]
  },
  {
    "id": "tr-286",
    "title": "Tuzlu Kurabiye (Pastane Usulü)",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "margarin",
      "sıvı yağ",
      "yumurta akı",
      "sirke",
      "mahlep",
      "şeker",
      "tuz",
      "un",
      "kabartma tozu",
      "yumurta sarısı",
      "susam",
      "çörek otu"
    ]
  },
  {
    "id": "tr-287",
    "title": "İncirli Kurabiye",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "sıvı yağ",
      "yoğurt",
      "yumurta",
      "pudra şekeri",
      "un",
      "kabartma tozu",
      "vanilya",
      "kuru incir",
      "ceviz",
      "tarçın"
    ]
  },
  {
    "id": "tr-288",
    "title": "Islak Kek (Brownie Tadında)",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "şeker",
      "süt",
      "sıvı yağ",
      "un",
      "kakao",
      "kabartma tozu",
      "vanilya",
      "süt",
      "şeker",
      "kakao",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-289",
    "title": "Ağlayan Kek",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "şeker",
      "süt",
      "sıvı yağ",
      "un",
      "kakao",
      "kabartma tozu",
      "vanilya",
      "süt",
      "krem şanti",
      "çikolata sosu"
    ]
  },
  {
    "id": "tr-290",
    "title": "Havuçlu Tarçınlı Kek",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "şeker",
      "süt",
      "sıvı yağ",
      "un",
      "havuç",
      "ceviz",
      "tarçın",
      "kabartma tozu",
      "vanilya"
    ]
  },
  {
    "id": "tr-291",
    "title": "Tavuklu Keşkek",
    "cat": "tatli",
    "ings": [
      "buğday",
      "tavuk göğsü",
      "tavuk but",
      "tereyağı",
      "pul biber",
      "tuz",
      "su"
    ]
  },
  {
    "id": "tr-292",
    "title": "Etli Keşkek",
    "cat": "tatli",
    "ings": [
      "buğday",
      "kuzu eti",
      "dana eti",
      "tereyağı",
      "pul biber",
      "tuz",
      "su",
      "soğan"
    ]
  },
  {
    "id": "tr-293",
    "title": "Mercimekli Köfte (Salçalı)",
    "cat": "et_tavuk",
    "ings": [
      "kırmızı mercimek",
      "köftelik bulgur",
      "soğan",
      "salça",
      "biber salçası",
      "sıvı yağ",
      "kimyon",
      "pul biber",
      "tuz",
      "maydanoz",
      "taze soğan",
      "su"
    ]
  },
  {
    "id": "tr-294",
    "title": "Soğan Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "arpacık soğan",
      "kuzu kıyma",
      "nar ekşisi",
      "pul biber",
      "karabiber",
      "tuz",
      "maydanoz"
    ]
  },
  {
    "id": "tr-295",
    "title": "Sarımsak Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "taze sarımsak",
      "kuzu kıyma",
      "biber salçası",
      "pul biber",
      "karabiber",
      "tuz",
      "maydanoz"
    ]
  },
  {
    "id": "tr-296",
    "title": "Patlıcan Kebabı (Urfa Usulü)",
    "cat": "et_tavuk",
    "ings": [
      "patlıcan",
      "kuzu kıyma",
      "domates",
      "yeşil biber",
      "isot",
      "tuz"
    ]
  },
  {
    "id": "tr-297",
    "title": "Simit Kebabı",
    "cat": "hamur_borek",
    "ings": [
      "kuzu kıyma",
      "köftelik bulgur",
      "antep fıstığı",
      "sarımsak",
      "pul biber",
      "karabiber",
      "tuz",
      "maydanoz"
    ]
  },
  {
    "id": "tr-298",
    "title": "Oruk Kebabı (İçli Köfte Benzeri)",
    "cat": "et_tavuk",
    "ings": [
      "köftelik bulgur",
      "irmik",
      "kıyma",
      "soğan",
      "biber salçası",
      "kimyon",
      "pul biber",
      "tuz",
      "ceviz",
      "maydanoz",
      "tereyağı"
    ]
  },
  {
    "id": "tr-299",
    "title": "Yoğurtlu Kebap (Kıymalı)",
    "cat": "et_tavuk",
    "ings": [
      "pide ekmeği",
      "kıyma",
      "soğan",
      "salça",
      "tereyağı",
      "pul biber",
      "yoğurt",
      "sarımsak",
      "nane"
    ]
  },
  {
    "id": "tr-300",
    "title": "Beyti Kebabı (Ev Usulü)",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kıyma",
      "dana kıyma",
      "sarımsak",
      "pul biber",
      "karabiber",
      "tuz",
      "lavaş ekmeği",
      "tereyağı",
      "salça",
      "yoğurt"
    ]
  },
  {
    "id": "tr-301",
    "title": "Kaşarlı Köfte",
    "cat": "et_tavuk",
    "ings": [
      "kıyma",
      "soğan",
      "galeta unu",
      "yumurta",
      "kimyon",
      "karabiber",
      "tuz",
      "kaşar peyniri"
    ]
  },
  {
    "id": "tr-302",
    "title": "Pideli Köfte",
    "cat": "hamur_borek",
    "ings": [
      "kıyma",
      "soğan",
      "ekmek içi",
      "kimyon",
      "tuz",
      "pide ekmeği",
      "tereyağı",
      "domates sosu",
      "yoğurt",
      "domates",
      "biber"
    ]
  },
  {
    "id": "tr-303",
    "title": "Akçaabat Köftesi",
    "cat": "et_tavuk",
    "ings": [
      "dana kıyma",
      "ekmek içi",
      "sarımsak",
      "tuz"
    ]
  },
  {
    "id": "tr-304",
    "title": "İnegöl Köfte",
    "cat": "et_tavuk",
    "ings": [
      "dana kıyma",
      "kuzu kıyma",
      "soğan suyu",
      "karbonat",
      "tuz"
    ]
  },
  {
    "id": "tr-305",
    "title": "Tavuklu Talaş Böreği",
    "cat": "et_tavuk",
    "ings": [
      "milföy hamuru",
      "tavuk göğsü",
      "soğan",
      "bezelye",
      "havuç",
      "mantar",
      "karabiber",
      "tuz",
      "yumurta sarısı",
      "krema"
    ]
  },
  {
    "id": "tr-306",
    "title": "Pırasalı Börek",
    "cat": "hamur_borek",
    "ings": [
      "hazır yufka",
      "pırasa",
      "soğan",
      "havuç",
      "salça",
      "pul biber",
      "tuz",
      "yumurta",
      "yoğurt",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-307",
    "title": "Peynirli Muska Böreği",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "hazır yufka",
      "beyaz peynir",
      "lor peyniri",
      "maydanoz",
      "yumurta akı",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-308",
    "title": "Sodalı Börek",
    "cat": "hamur_borek",
    "ings": [
      "hazır yufka",
      "beyaz peynir",
      "lor peyniri",
      "maydanoz",
      "yumurta",
      "süt",
      "sıvı yağ",
      "maden suyu",
      "tereyağı"
    ]
  },
  {
    "id": "tr-309",
    "title": "Boşnak Böreği (Kıymalı)",
    "cat": "et_tavuk",
    "ings": [
      "un",
      "su",
      "tuz",
      "sıvı yağ",
      "kıyma",
      "soğan",
      "karabiber",
      "tuz",
      "tereyağı",
      "yoğurt"
    ]
  },
  {
    "id": "tr-310",
    "title": "Sarıyer Böreği",
    "cat": "et_tavuk",
    "ings": [
      "milföy hamuru",
      "kıyma",
      "soğan",
      "kuş üzümü",
      "çam fıstığı",
      "karabiber",
      "tuz",
      "yumurta sarısı"
    ]
  },
  {
    "id": "tr-311",
    "title": "Kaytaz Böreği",
    "cat": "et_tavuk",
    "ings": [
      "un",
      "maya",
      "su",
      "tuz",
      "kıyma",
      "soğan",
      "nar ekşisi",
      "salça",
      "pul biber",
      "karabiber",
      "tereyağı"
    ]
  },
  {
    "id": "tr-312",
    "title": "Paçanga Böreği",
    "cat": "et_tavuk",
    "ings": [
      "hazır yufka",
      "pastırma",
      "kaşar peyniri",
      "domates",
      "yeşil biber",
      "yumurta",
      "galeta unu",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-313",
    "title": "Mercimekli Börek",
    "cat": "hamur_borek",
    "ings": [
      "hazır yufka",
      "yeşil mercimek",
      "soğan",
      "salça",
      "karabiber",
      "pul biber",
      "tuz",
      "yumurta",
      "yoğurt",
      "sıvı yağ"
    ]
  },
  {
    "id": "tr-314",
    "title": "Bohça Kebabı",
    "cat": "et_tavuk",
    "ings": [
      "krep hamuru (un, yumurta, süt)",
      "kuzu kuşbaşı",
      "bezelye",
      "havuç",
      "mantar",
      "beşamel sos",
      "kaşar peyniri",
      "tereyağı",
      "tuz",
      "karabiber"
    ]
  },
  {
    "id": "tr-315",
    "title": "Pekmezli Kaçamak",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "mısır unu",
      "su",
      "tuz",
      "tereyağı",
      "pekmez"
    ]
  },
  {
    "id": "tr-316",
    "title": "Batırık",
    "cat": "salata_meze",
    "ings": [
      "köftelik bulgur",
      "tahin",
      "domates",
      "salatalık",
      "biber",
      "soğan",
      "maydanoz",
      "nar ekşisi",
      "sumak",
      "pul biber",
      "tuz",
      "su",
      "ceviz",
      "lahana"
    ]
  },
  {
    "id": "tr-317",
    "title": "Çökelek Salatası",
    "cat": "salata_meze",
    "ings": [
      "çökelek",
      "lor peyniri",
      "domates",
      "biber",
      "taze soğan",
      "maydanoz",
      "nane",
      "zeytinyağı",
      "pul biber",
      "kekik",
      "tuz"
    ]
  },
  {
    "id": "tr-318",
    "title": "Yoğurtlu Semizotu Kavurması",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "semizotu",
      "soğan",
      "sarımsak",
      "bulgur",
      "sıvı yağ",
      "salça",
      "pul biber",
      "tuz",
      "yoğurt"
    ]
  },
  {
    "id": "tr-319",
    "title": "Kereviz Salatası (Yoğurtlu)",
    "cat": "salata_meze",
    "ings": [
      "kereviz",
      "yoğurt",
      "sarımsak",
      "ceviz",
      "mayonez",
      "dereotu",
      "tuz"
    ]
  },
  {
    "id": "tr-320",
    "title": "Kırmızı Pancar Salatası",
    "cat": "salata_meze",
    "ings": [
      "pancar",
      "kırmızı soğan",
      "maydanoz",
      "ceviz",
      "zeytinyağı",
      "nar ekşisi",
      "sirke",
      "tuz"
    ]
  },
  {
    "id": "tr-321",
    "title": "Nohut Salatası",
    "cat": "salata_meze",
    "ings": [
      "nohut",
      "kırmızı soğan",
      "domates",
      "salatalık",
      "biber",
      "maydanoz",
      "dereotu",
      "zeytinyağı",
      "limon suyu",
      "sumak",
      "kimyon",
      "tuz"
    ]
  },
  {
    "id": "tr-322",
    "title": "Maş Fasulyesi Salatası",
    "cat": "salata_meze",
    "ings": [
      "maş fasulyesi",
      "kırmızı biber",
      "yeşil biber",
      "taze soğan",
      "maydanoz",
      "dereotu",
      "mısır konservesi",
      "nar",
      "zeytinyağı",
      "nar ekşisi",
      "tuz"
    ]
  },
  {
    "id": "tr-323",
    "title": "Manca (Patlıcanlı Meze)",
    "cat": "salata_meze",
    "ings": [
      "patlıcan",
      "kırmızı biber",
      "yeşil biber",
      "domates",
      "sarımsak",
      "sirke",
      "zeytinyağı",
      "tuz"
    ]
  },
  {
    "id": "tr-324",
    "title": "Girit Ezmesi",
    "cat": "salata_meze",
    "ings": [
      "beyaz peynir",
      "lor peyniri",
      "antep fıstığı",
      "sarımsak",
      "kekik",
      "zeytinyağı",
      "galeta unu"
    ]
  },
  {
    "id": "tr-325",
    "title": "Hardal Otu Salatası",
    "cat": "salata_meze",
    "ings": [
      "hardal otu",
      "sarımsak",
      "zeytinyağı",
      "limon suyu",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-326",
    "title": "Yoğurtlu Makarna",
    "cat": "bakliyat_pilav",
    "ings": [
      "makarna",
      "yoğurt",
      "sarımsak",
      "tereyağı",
      "nane",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-327",
    "title": "Peynirli Makarna",
    "cat": "bakliyat_pilav",
    "ings": [
      "makarna",
      "beyaz peynir",
      "lor peyniri",
      "maydanoz",
      "tereyağı",
      "pul biber"
    ]
  },
  {
    "id": "tr-328",
    "title": "Cevizli Makarna",
    "cat": "bakliyat_pilav",
    "ings": [
      "makarna",
      "ceviz",
      "tereyağı",
      "pul biber",
      "karabiber",
      "tuz"
    ]
  },
  {
    "id": "tr-329",
    "title": "Tavuklu Makarna",
    "cat": "bakliyat_pilav",
    "ings": [
      "makarna",
      "tavuk göğsü",
      "krema",
      "mantar",
      "soğan",
      "sarımsak",
      "kekik",
      "karabiber",
      "tuz",
      "parmesan peyniri"
    ]
  },
  {
    "id": "tr-330",
    "title": "Belen Tava",
    "cat": "et_tavuk",
    "ings": [
      "kuzu kuşbaşı",
      "biber",
      "domates",
      "sarımsak",
      "soğan",
      "tereyağı",
      "kekik",
      "pul biber",
      "tuz"
    ]
  },
  {
    "id": "tr-331",
    "title": "Zingil Tatlısı",
    "cat": "tatli",
    "ings": [
      "un",
      "yoğurt",
      "yumurta",
      "karbonat",
      "tuz",
      "sıvı yağ",
      "şeker",
      "su",
      "limon suyu"
    ]
  },
  {
    "id": "tr-332",
    "title": "Sam Tatlısı (Şambali)",
    "cat": "tatli",
    "ings": [
      "irmik",
      "yoğurt",
      "şeker",
      "un",
      "karbonat",
      "vanilya",
      "yer fıstığı",
      "badem",
      "su",
      "şeker",
      "limon suyu",
      "pekmez"
    ]
  },
  {
    "id": "tr-333",
    "title": "Cevizli Rulo Tatlı",
    "cat": "tatli",
    "ings": [
      "un",
      "tereyağı",
      "yoğurt",
      "yumurta",
      "kabartma tozu",
      "ceviz",
      "tarçın",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-334",
    "title": "Saray Sarması (Muhallebili)",
    "cat": "tatli",
    "ings": [
      "tereyağı",
      "un",
      "süt",
      "şeker",
      "nişasta",
      "vanilya",
      "hindistan cevizi",
      "krem şanti",
      "ceviz",
      "fındık"
    ]
  },
  {
    "id": "tr-335",
    "title": "Fıstıklı Sarma (Tatlı)",
    "cat": "tatli",
    "ings": [
      "baklavalık yufka",
      "antep fıstığı",
      "tereyağı",
      "su",
      "şeker",
      "limon suyu"
    ]
  },
  {
    "id": "tr-336",
    "title": "İrmik Topları (Hindistan Cevizli)",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "irmik",
      "süt",
      "şeker",
      "tereyağı",
      "vanilya",
      "hindistan cevizi"
    ]
  },
  {
    "id": "tr-337",
    "title": "Sultan Lokumu",
    "cat": "tatli",
    "ings": [
      "süt",
      "şeker",
      "un",
      "nişasta",
      "tereyağı",
      "vanilya",
      "hindistan cevizi",
      "krem şanti",
      "çilek",
      "muz"
    ]
  },
  {
    "id": "tr-338",
    "title": "Haşhaşlı Çörek",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "un",
      "maya",
      "süt",
      "su",
      "sıvı yağ",
      "şeker",
      "tuz",
      "haşhaş ezmesi",
      "sıvı yağ",
      "ceviz",
      "yumurta sarısı"
    ]
  },
  {
    "id": "tr-339",
    "title": "Tahinli Çörek",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "un",
      "maya",
      "süt",
      "su",
      "sıvı yağ",
      "şeker",
      "tuz",
      "tahin",
      "şeker",
      "sıvı yağ",
      "ceviz",
      "yumurta sarısı"
    ]
  },
  {
    "id": "tr-340",
    "title": "Kandil Simidi",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "tereyağı",
      "sıvı yağ",
      "yoğurt",
      "yumurta sarısı",
      "sirke",
      "mahlep",
      "kabartma tozu",
      "tuz",
      "şeker",
      "un",
      "yumurta akı",
      "susam",
      "çörek otu"
    ]
  },
  {
    "id": "tr-341",
    "title": "Peynirli Tepsi Keki (Tuzlu)",
    "cat": "tatli",
    "ings": [
      "yumurta",
      "yoğurt",
      "sıvı yağ",
      "un",
      "kabartma tozu",
      "tuz",
      "beyaz peynir",
      "maydanoz",
      "dereotu",
      "pul biber",
      "susam"
    ]
  },
  {
    "id": "tr-342",
    "title": "Acur Turşusu",
    "cat": "salata_meze",
    "ings": [
      "acur",
      "sirke",
      "su",
      "kaya tuzu",
      "sarımsak",
      "nohut",
      "dereotu"
    ]
  },
  {
    "id": "tr-343",
    "title": "Kelek Turşusu",
    "cat": "salata_meze",
    "ings": [
      "kelek",
      "sirke",
      "su",
      "kaya tuzu",
      "sarımsak",
      "acı biber"
    ]
  },
  {
    "id": "tr-344",
    "title": "Erik Hoşafı",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kuru erik",
      "taze erik",
      "su",
      "şeker",
      "karanfil"
    ]
  },
  {
    "id": "tr-345",
    "title": "Kayısı Hoşafı",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kuru kayısı",
      "taze kayısı",
      "su",
      "şeker",
      "karanfil"
    ]
  },
  {
    "id": "tr-346",
    "title": "Üzüm Hoşafı",
    "cat": "sebze_zeytinyagli",
    "ings": [
      "kuru üzüm",
      "su",
      "şeker"
    ]
  },
  {
    "id": "tr-347",
    "title": "Elma Kompostosu",
    "cat": "tatli",
    "ings": [
      "elma",
      "su",
      "şeker",
      "tarçın",
      "karanfil"
    ]
  },
  {
    "id": "tr-348",
    "title": "Vişne Kompostosu",
    "cat": "tatli",
    "ings": [
      "vişne",
      "su",
      "şeker"
    ]
  },
  {
    "id": "tr-349",
    "title": "Şeftali Kompostosu",
    "cat": "tatli",
    "ings": [
      "şeftali",
      "su",
      "şeker",
      "karanfil"
    ]
  },
  {
    "id": "tr-350",
    "title": "Armut Kompostosu",
    "cat": "tatli",
    "ings": [
      "armut",
      "su",
      "şeker",
      "tarçın",
      "karanfil"
    ]
  }
];

export const WORLD_CUISINE_RAW = [
  {
    "title": "Fettuccine Alfredo (Kremalı Tavuklu İtalyan Makarnası)",
    "country": "🇮🇹 İtalyan",
    "cat": "dunya_mutfagi",
    "prep": 10,
    "cook": 15,
    "cal": 460,
    "ings": [
      [
        "makarna",
        1,
        "paket"
      ],
      [
        "tavuk göğsü",
        400,
        "gram"
      ],
      [
        "krema",
        1,
        "paket"
      ],
      [
        "tereyağı",
        2,
        "yemek kaşığı"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "kaşar peyniri",
        100,
        "gram"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        1,
        "çay kaşığı"
      ],
      [
        "maydanoz",
        0.25,
        "demet"
      ]
    ],
    "tip": "Makarna haşlama suyundan yarım çay bardağı krema sosuna eklerseniz sos makarnayla ipek gibi bütünleşir.",
    "serve": "Taze çekilmiş karabiber, sarımsaklı ekmek ve yeşil salata ile servis edin.",
    "steps": [
      "Makarnayı tuzlu kaynar suda 8-10 dakika haşlayın.",
      "Tavada tereyağında jülyen doğranmış tavukları ve sarımsağı yüksek ateşte soteleyin.",
      "Kremayı ve rendelenmiş peyniri ekleyip kısık ateşte 3 dakika kıvamlandırın, haşlanan makarnayla harmanlayın."
    ]
  },
  {
    "title": "Spagetti Bolonez (Gerçek İtalyan Kıymalı Soslu)",
    "country": "🇮🇹 İtalyan",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 30,
    "cal": 430,
    "ings": [
      [
        "makarna",
        1,
        "paket"
      ],
      [
        "kıyma",
        350,
        "gram"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "havuç",
        1,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "domates",
        3,
        "adet"
      ],
      [
        "salça",
        1.5,
        "yemek kaşığı"
      ],
      [
        "zeytinyağı",
        3,
        "yemek kaşığı"
      ],
      [
        "kekik",
        1,
        "tatlı kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "Bolonez sosun sırrı soğanla birlikte çok ince rendelenmiş 1 adet havucu kavurmaktır; domatesin asidini alır ve harika bir lezzet verir.",
    "serve": "Üzerine bol rendelenmiş peynir ve taze fesleğen/maydanoz ile servis edin.",
    "steps": [
      "Zeytinyağında ince kıyılmış soğan, sarımsak ve rendelenmiş havucu yumuşayana dek kavurun.",
      "Kıymayı ekleyip suyunu çekene kadar kavurun, salça ve rendelenmiş domatesleri katıp kısık ateşte 20 dk pişirin.",
      "Haşlanmış spagetti üzerine bol Bolonez sos gezdirerek servis yapın."
    ]
  },
  {
    "title": "Ev Yapımı İtalyan Lazanya (Bol Kıymalı & Beşamelli)",
    "country": "🇮🇹 İtalyan",
    "cat": "dunya_mutfagi",
    "prep": 25,
    "cook": 35,
    "cal": 490,
    "ings": [
      [
        "makarna",
        1,
        "paket"
      ],
      [
        "kıyma",
        400,
        "gram"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "domates",
        3,
        "adet"
      ],
      [
        "salça",
        2,
        "yemek kaşığı"
      ],
      [
        "süt",
        3,
        "su bardağı"
      ],
      [
        "un",
        2.5,
        "yemek kaşığı"
      ],
      [
        "tereyağı",
        2,
        "yemek kaşığı"
      ],
      [
        "kaşar peyniri",
        200,
        "gram"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "Lazanya yapraklarının kenarlarının kuru kalmaması için beşamel sosu normalden biraz daha akışkan hazırlayın ve her kata bolca yayın.",
    "serve": "Fırından çıktıktan sonra 10 dakika dinlendirip dilimleyin, roka salatası ile servis edin.",
    "steps": [
      "Kıyma, soğan, salça ve domatesle hafif sulu bir Bolonez sos pişirin.",
      "Tereyağında unu kavurup soğuk sütü ekleyerek pürüzsüz beşamel sos hazırlayın.",
      "Borcama sırasıyla beşamel sos, lazanya/makarna, kıymalı sos ve kaşar peyniri dizip 190°C fırında 30 dk pişirin."
    ]
  },
  {
    "title": "Mantarlı Kremalı İtalyan Risotto",
    "country": "🇮🇹 İtalyan",
    "cat": "dunya_mutfagi",
    "prep": 10,
    "cook": 25,
    "cal": 380,
    "ings": [
      [
        "pirinç",
        1.5,
        "su bardağı"
      ],
      [
        "mantar",
        300,
        "gram"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "tereyağı",
        2.5,
        "yemek kaşığı"
      ],
      [
        "zeytinyağı",
        2,
        "yemek kaşığı"
      ],
      [
        "su",
        4.5,
        "su bardağı"
      ],
      [
        "kaşar peyniri",
        80,
        "gram"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "Risotto yaparken pirinci yıkamayın (nişastası krema kıvamını verir) ve sıcak suyu kepçe kepçe, pirinç çektikçe yavaşça ekleyin.",
    "serve": "Sıcakken üzerine ekstra rendelenmiş peynir ve ince kıyılmış maydanoz serpin.",
    "steps": [
      "Zeytinyağında ince doğranmış soğan, sarımsak ve dilimlenmiş mantarları soteleyin.",
      "Pirinci ekleyip 2 dakika kavurun. Sıcak suyu birer kepçe ekleyip karıştırarak pirinçler yumuşayana dek pişirin.",
      "Ocaktan alınca soğuk tereyağı ve peyniri ekleyip hızlıca karıştırarak krema kıvamına getirin."
    ]
  },
  {
    "title": "Ev Yapımı İnce Hamurlu İtalyan Pizza (Karışık)",
    "country": "🇮🇹 İtalyan",
    "cat": "dunya_mutfagi",
    "prep": 25,
    "cook": 18,
    "cal": 420,
    "ings": [
      [
        "un",
        3,
        "su bardağı"
      ],
      [
        "maya",
        1,
        "paket"
      ],
      [
        "su",
        1,
        "su bardağı"
      ],
      [
        "zeytinyağı",
        3,
        "yemek kaşığı"
      ],
      [
        "salça",
        1.5,
        "yemek kaşığı"
      ],
      [
        "domates",
        1,
        "adet"
      ],
      [
        "kaşar peyniri",
        200,
        "gram"
      ],
      [
        "sucuk",
        150,
        "gram"
      ],
      [
        "mantar",
        100,
        "gram"
      ],
      [
        "yeşil biber",
        2,
        "adet"
      ],
      [
        "mısır konservesi",
        0.5,
        "su bardağı"
      ],
      [
        "kekik",
        1,
        "tatlı kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Pizza tepsisini fırının en alt rafına yakın koyup 220°C yüksek ısıda pişirirseniz tabanı taş fırın pizzası gibi çıtır olur.",
    "serve": "Dilimleyerek sıcak servis edin.",
    "steps": [
      "Un, ılık su, maya, zeytinyağı ve tuz ile yumuşak bir hamur yoğurup 30 dk mayalandırın.",
      "Hamuru ince açıp üzerine zeytinyağı, kekik ve suyla açılmış salçalı sosu sürün.",
      "Önce kaşar peynirini, ardından sucuk, mantar, biber ve mısırı dizip 220°C fırında 15-18 dk pişirin."
    ]
  },
  {
    "title": "Penne Arrabbiata (Acılı Domates Soslu İtalyan Makarnası)",
    "country": "🇮🇹 İtalyan",
    "cat": "dunya_mutfagi",
    "prep": 10,
    "cook": 15,
    "cal": 340,
    "ings": [
      [
        "makarna",
        1,
        "paket"
      ],
      [
        "domates",
        4,
        "adet"
      ],
      [
        "salça",
        1,
        "yemek kaşığı"
      ],
      [
        "sarımsak",
        3,
        "diş"
      ],
      [
        "zeytinyağı",
        4,
        "yemek kaşığı"
      ],
      [
        "pul biber",
        2,
        "tatlı kaşığı"
      ],
      [
        "maydanoz",
        0.5,
        "demet"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Sarımsakları ve acı pul biberi zeytinyağında yakmadan kısık ateşte 1 dakika çevirmek yağa tüm aromayı geçirir.",
    "serve": "İnce kıyılmış taze maydanoz ve rendelenmiş peynir ile servis edin.",
    "steps": [
      "Kalem makarnayı tuzlu suda diri (al dente) kalacak şekilde haşlayın.",
      "Zeytinyağında sarımsak ve pul biberi çevirip rendelenmiş domates ve salçayı ekleyerek koyulaşana dek pişirin.",
      "Makarnayı sosla birleştirip maydanozla servis yapın."
    ]
  },
  {
    "title": "Klasik İtalyan Tiramisu (Ev Usulü Pratik)",
    "country": "🇮🇹 İtalyan",
    "cat": "tatli",
    "prep": 20,
    "cook": 10,
    "cal": 350,
    "ings": [
      [
        "petibör bisküvi",
        2,
        "paket"
      ],
      [
        "süt",
        3,
        "su bardağı"
      ],
      [
        "un",
        3,
        "yemek kaşığı"
      ],
      [
        "şeker",
        1,
        "su bardağı"
      ],
      [
        "yumurta",
        1,
        "adet"
      ],
      [
        "labne",
        1,
        "paket"
      ],
      [
        "vanilya",
        1,
        "paket"
      ],
      [
        "kakao",
        3,
        "yemek kaşığı"
      ]
    ],
    "tip": "Labne peynirini muhallebi tamamen ılıdıktan sonra ekleyip çırparsanız kremanız asla sulanmaz ve ipek gibi olur.",
    "serve": "Servis etmeden hemen önce süzgeçle üzerine bol kakao eleyin.",
    "steps": [
      "Süt, un, şeker ve yumurta sarısını pişirip muhallebi yapın; ılıyınca vanilya ve labneyi ekleyip çırpın.",
      "Bisküvileri kahveli/kakaolu ılık sütle ıslatıp borcama dizin ve kat aralarına kremayı yayın.",
      "Buzdolabında 3 saat dinlendirip üzerine kakao eleyerek servis yapın."
    ]
  },
  {
    "title": "İtalyan Minestrone (Zengin Sebze & Makarna Çorbası)",
    "country": "🇮🇹 İtalyan",
    "cat": "corba",
    "prep": 15,
    "cook": 25,
    "cal": 210,
    "ings": [
      [
        "patates",
        1,
        "adet"
      ],
      [
        "havuç",
        1,
        "adet"
      ],
      [
        "kabak",
        1,
        "adet"
      ],
      [
        "kuru fasulye",
        1,
        "su bardağı"
      ],
      [
        "makarna",
        0.5,
        "su bardağı"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "domates",
        2,
        "adet"
      ],
      [
        "zeytinyağı",
        3,
        "yemek kaşığı"
      ],
      [
        "su",
        5,
        "su bardağı"
      ],
      [
        "kekik",
        1,
        "tatlı kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Tüm sebzeleri aynı boyutta (küçük zar şeklinde) doğrarsanız her kaşıkta tüm lezzetler dengeli gelir.",
    "serve": "Kızarmış ekmek dilimleri üzerinde eritilmiş kaşar peyniri ile servis edin.",
    "steps": [
      "Zeytinyağında soğan, sarımsak, küp doğranmış havuç ve patatesi 5 dk soteleyin.",
      "Kabak, domates, sıcak su ve haşlanmış fasulyeyi ekleyip 15 dk kaynatın.",
      "Küçük makarnayı ve kekiği ekleyip makarnalar yumuşayana dek 8 dk daha pişirin."
    ]
  },
  {
    "title": "Patatesli İtalyan Gnocchi (Domates & Tereyağı Soslu)",
    "country": "🇮🇹 İtalyan",
    "cat": "dunya_mutfagi",
    "prep": 25,
    "cook": 15,
    "cal": 340,
    "ings": [
      [
        "patates",
        4,
        "adet"
      ],
      [
        "un",
        1.5,
        "su bardağı"
      ],
      [
        "yumurta",
        1,
        "adet"
      ],
      [
        "domates",
        3,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "tereyağı",
        2,
        "yemek kaşığı"
      ],
      [
        "kaşar peyniri",
        60,
        "gram"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Haşlanmış patatesleri sıcakken ezip çok az unla (sadece toparlanacak kadar) yoğurursanız Gnocchi bulut gibi yumuşacık olur.",
    "serve": "Üzerine sarımsaklı domates sosu ve rendelenmiş peynir gezdirin.",
    "steps": [
      "Haşlanmış patatesleri ezip yumurta, tuz ve unla yumuşak bir hamur yapın; fındık büyüklüğünde kesip çatalla şekil verin.",
      "Kaynar tuzlu suya atın, su yüzüne çıktıktan 1 dakika sonra kevgirle alın.",
      "Tereyağlı sarımsaklı domates sosuyla harmanlayıp sıcak servis yapın."
    ]
  },
  {
    "title": "Tavuklu Fajita (Renkli Biberli Meksika Klasiği)",
    "country": "🇲🇽 Meksika",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 15,
    "cal": 370,
    "ings": [
      [
        "tavuk göğsü",
        500,
        "gram"
      ],
      [
        "soğan",
        2,
        "adet"
      ],
      [
        "yeşil biber",
        2,
        "adet"
      ],
      [
        "kırmızı biber",
        2,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "zeytinyağı",
        3,
        "yemek kaşığı"
      ],
      [
        "kimyon",
        1,
        "tatlı kaşığı"
      ],
      [
        "pul biber",
        1,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "lavaş ekmeği",
        4,
        "adet"
      ]
    ],
    "tip": "Sebzeleri çok öldürmeyin; yüksek ateşte hafif karamelize olup dişe gelir (çıtır) kalması gerçek Fajita lezzetini verir.",
    "serve": "Sıcak lavaş ekmeği, süzme yoğurt ve avokado/salata ile servis edin.",
    "steps": [
      "Tavukları ve biberleri uzun şeritler (jülyen) halinde doğrayın, baharat ve zeytinyağı ile harmanlayın.",
      "Çok kızgın tavada önce tavukları yüksek ateşte mühürleyip kenara alın.",
      "Aynı tavada piyazlık soğan ve renkli biberleri 4 dk yüksek ateşte soteleyip tavuklarla birleştirin."
    ]
  },
  {
    "title": "Kıymalı Meksika Taco & Quesadilla",
    "country": "🇲🇽 Meksika",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 15,
    "cal": 410,
    "ings": [
      [
        "lavaş ekmeği",
        4,
        "adet"
      ],
      [
        "kıyma",
        350,
        "gram"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "kırmızı biber",
        1,
        "adet"
      ],
      [
        "mısır konservesi",
        1,
        "su bardağı"
      ],
      [
        "salça",
        1,
        "yemek kaşığı"
      ],
      [
        "kaşar peyniri",
        150,
        "gram"
      ],
      [
        "kimyon",
        1,
        "tatlı kaşığı"
      ],
      [
        "pul biber",
        1,
        "tatlı kaşığı"
      ],
      [
        "sıvı yağ",
        2,
        "yemek kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Lavaşı tavada ısıtırken iki katman arasına rendelenmiş kaşar peyniri serperseniz eriyen peynir lavaşları birbirine mükemmel yapıştırır.",
    "serve": "Üçgen dilimleyerek yoğurtlu sos ve doğranmış domatesle ikram edin.",
    "steps": [
      "Tavada kıymayı, ince doğranmış soğanı ve kırmızı biberi kavurun.",
      "Salça, mısır, kimyon, pul biber ve tuzu ekleyip 5 dakika pişirin.",
      "Lavaşın yarısına kaşar peyniri ve kıymalı harcı koyup yarım ay şeklinde kapatın, tavada arkalı önlü kızartın."
    ]
  },
  {
    "title": "Chili Con Carne (Kıymalı Meksika Fasulye Güveci)",
    "country": "🇲🇽 Meksika",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 30,
    "cal": 395,
    "ings": [
      [
        "kıyma",
        350,
        "gram"
      ],
      [
        "kuru fasulye",
        1.5,
        "su bardağı"
      ],
      [
        "mısır konservesi",
        0.5,
        "su bardağı"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "domates",
        3,
        "adet"
      ],
      [
        "salça",
        1.5,
        "yemek kaşığı"
      ],
      [
        "yeşil biber",
        2,
        "adet"
      ],
      [
        "kimyon",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "pul biber",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "sıvı yağ",
        3,
        "yemek kaşığı"
      ],
      [
        "su",
        1.5,
        "su bardağı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Pişmeye yakın içine 1 çay kaşığı kakao veya 1 kare bitter çikolata atmak Meksika mutfağının en büyük sırrıdır; sosun lezzetini inanılmaz derinleştirir.",
    "serve": "Beyaz pirinç pilavı veya lavaş cipsleri ve süzme yoğurtla servis edin.",
    "steps": [
      "Kıymayı soğan, sarımsak ve doğranmış biberlerle birlikte kavurun.",
      "Salça, küp domates, kimyon, pul biber ve sıcak suyu ekleyip 15 dk kaynatın.",
      "Haşlanmış fasulye ve mısırı ekleyip kısık ateşte 10-15 dk sos koyulaşana dek pişirin."
    ]
  },
  {
    "title": "Tavuklu Fırın Enchilada (Meksika Usulü Soslu Lavaş Dürüm)",
    "country": "🇲🇽 Meksika",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 20,
    "cal": 415,
    "ings": [
      [
        "lavaş ekmeği",
        4,
        "adet"
      ],
      [
        "tavuk göğsü",
        400,
        "gram"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "domates",
        3,
        "adet"
      ],
      [
        "salça",
        1.5,
        "yemek kaşığı"
      ],
      [
        "mısır konservesi",
        0.5,
        "su bardağı"
      ],
      [
        "kaşar peyniri",
        150,
        "gram"
      ],
      [
        "kimyon",
        1,
        "tatlı kaşığı"
      ],
      [
        "pul biber",
        1,
        "tatlı kaşığı"
      ],
      [
        "sıvı yağ",
        3,
        "yemek kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Lavaşları sarmadan önce hazırladığınız kırmızı domates sosundan birer kaşık içlerine sürerseniz fırında yumuşacık ve sulu kalırlar.",
    "serve": "Üzerine ince kıyılmış taze soğan ve süzme yoğurt ekleyerek sıcak servis edin.",
    "steps": [
      "Sarımsak, salça, rendelenmiş domates ve kimyonla Enchilada sosunu 8 dk kaynatın.",
      "Sotelenmiş tavuk ve mısırı lavaşlara sarıp borcama yan yana dizin.",
      "Üzerine kalan domates sosunu ve bol kaşar peynirini yayıp 190°C fırında 18 dk kızartın."
    ]
  },
  {
    "title": "İspanyol Tortilla (Patatesli & Soğanlı Kalın İspanyol Omleti)",
    "country": "🇪🇸 İspanyol",
    "cat": "kahvalti",
    "prep": 15,
    "cook": 20,
    "cal": 310,
    "ings": [
      [
        "patates",
        4,
        "adet"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "yumurta",
        5,
        "adet"
      ],
      [
        "zeytinyağı",
        0.5,
        "su bardağı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ],
      [
        "maydanoz",
        0.25,
        "demet"
      ]
    ],
    "tip": "Patatesleri kızartmak yerine zeytinyağında orta-kısık ateşte soğanlarla birlikte yumuşayana dek pişirirseniz gerçek İspanyol Tortilla dokusunu yakalarsınız.",
    "serve": "Pasta dilimi gibi keserek hem kahvaltıda hem akşam yemeğinde servis edebilirsiniz.",
    "steps": [
      "İnce dilimlenmiş patates ve soğanları zeytinyağında yumuşayana kadar 12 dk pişirip fazla yağını süzün.",
      "Geniş bir kasede çırpılmış yumurtalar, tuz ve karabiber ile ılımış patatesleri karıştırın.",
      "Yanmaz tavada kısık ateşte önce bir yüzünü, düz bir kapak yardımıyla çevirip diğer yüzünü pişirin."
    ]
  },
  {
    "title": "Tavuklu & Sebzeli İspanyol Paella (Aromalı Pilav)",
    "country": "🇪🇸 İspanyol",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 25,
    "cal": 410,
    "ings": [
      [
        "pirinç",
        2,
        "su bardağı"
      ],
      [
        "tavuk göğsü",
        350,
        "gram"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        3,
        "diş"
      ],
      [
        "kırmızı biber",
        1,
        "adet"
      ],
      [
        "bezelye",
        1,
        "su bardağı"
      ],
      [
        "domates",
        2,
        "adet"
      ],
      [
        "zeytinyağı",
        4,
        "yemek kaşığı"
      ],
      [
        "tavuk suyu",
        3.5,
        "su bardağı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ],
      [
        "limon",
        1,
        "adet"
      ]
    ],
    "tip": "Paella pişerken sıcak suyu ekledikten sonra pilavı bir daha karıştırmayın; tabanında oluşan hafif kızarmış katman (socarrat) en makbul kısmıdır.",
    "serve": "Kenarlarına limon dilimleri dizerek doğrudan geniş tavayla sofraya getirin.",
    "steps": [
      "Geniş bir tavada zeytinyağı ile kuşbaşı tavukları kızartın, soğan, sarımsak ve kırmızı biberi ekleyin.",
      "Rendelenmiş domatesi ve yıkanmış pirinci ekleyip 2 dakika kavurun.",
      "Sıcak tavuk suyunu ve bezelyeleri ekleyip kısık ateşte suyunu çekene kadar karıştırmadan pişirin."
    ]
  },
  {
    "title": "İspanyol Churros (Tarçın Şekerli & Çikolata Soslu Tatlı)",
    "country": "🇪🇸 İspanyol",
    "cat": "tatli",
    "prep": 15,
    "cook": 15,
    "cal": 340,
    "ings": [
      [
        "su",
        1,
        "su bardağı"
      ],
      [
        "tereyağı",
        2,
        "yemek kaşığı"
      ],
      [
        "un",
        1,
        "su bardağı"
      ],
      [
        "yumurta",
        2,
        "adet"
      ],
      [
        "şeker",
        0.5,
        "su bardağı"
      ],
      [
        "tarçın",
        1,
        "tatlı kaşığı"
      ],
      [
        "çikolata",
        80,
        "gram"
      ],
      [
        "sıvı yağ",
        1.5,
        "su bardağı"
      ],
      [
        "tuz",
        1,
        "tutam"
      ]
    ],
    "tip": "Kızaran tatlıları kağıt havluya aldıktan hemen sonra sıcakken tarçınlı şekere bularsanız şeker üzerine kusursuz yapışır.",
    "serve": "Yanında eritilmiş çikolata sosuna bandırarak sıcak servis edin.",
    "steps": [
      "Su, tereyağı ve bir tutam tuzu kaynatın. Unu ekleyip hızlıca toparlanana dek kavurun ve soğumaya bırakın.",
      "Ilıyan hamura yumurtaları tek tek yedirin, sıkma torbasıyla kızgın yağa sıkıp altın rengi olana dek kızartın.",
      "Tarçınlı toz şekere bulayıp çikolata sosla servis yapın."
    ]
  },
  {
    "title": "Sebzeli & Tavuklu Uzak Doğu Noodle",
    "country": "🥢 Asya",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 12,
    "cal": 390,
    "ings": [
      [
        "makarna",
        1,
        "paket"
      ],
      [
        "tavuk göğsü",
        350,
        "gram"
      ],
      [
        "havuç",
        2,
        "adet"
      ],
      [
        "kabak",
        1,
        "adet"
      ],
      [
        "kırmızı biber",
        1,
        "adet"
      ],
      [
        "yeşil biber",
        2,
        "adet"
      ],
      [
        "taze soğan",
        4,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "susam",
        1,
        "yemek kaşığı"
      ],
      [
        "sıvı yağ",
        3,
        "yemek kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Tüm sebzeleri kibrit çöpü (ince jülyen) şeklinde doğrayıp en yüksek ateşte sadece 3-4 dakika soteleyin ki diriliğini ve rengini korusun.",
    "serve": "Üzerine kavrulmuş susam ve ince kıyılmış taze soğan serperek sıcak servis edin.",
    "steps": [
      "Noodle veya spagetti makarnayı haşlayıp süzün.",
      "Geniş tavada yüksek ateşte ince doğranmış tavukları, sarımsağı ve ardından jülyen sebzeleri soteleyin.",
      "Haşlanan makarnayı tavaya ekleyip 2 dakika yüksek ateşte harmanlayın, susam ve taze soğanla sunun."
    ]
  },
  {
    "title": "Ballı Susamlı Çıtır Tavuk (Asya Usulü)",
    "country": "🇨🇳 Çin",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 15,
    "cal": 410,
    "ings": [
      [
        "tavuk göğsü",
        500,
        "gram"
      ],
      [
        "nişasta",
        3,
        "yemek kaşığı"
      ],
      [
        "yumurta",
        1,
        "adet"
      ],
      [
        "bal",
        2,
        "yemek kaşığı"
      ],
      [
        "salça",
        1,
        "yemek kaşığı"
      ],
      [
        "sirke",
        1,
        "yemek kaşığı"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "susam",
        1.5,
        "yemek kaşığı"
      ],
      [
        "sıvı yağ",
        0.5,
        "su bardağı"
      ],
      [
        "pul biber",
        1,
        "tatlı kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Tavukları una değil mısır/buğday nişastasına bulayarak kızartırsanız dışı saatlerce çıtır çıtır kalır.",
    "serve": "Yanında sade pirinç pilavı ile servis edin.",
    "steps": [
      "Kuşbaşı tavukları çırpılmış yumurta ve nişastaya bulayıp tavada altın sarısı olana dek kızartın.",
      "Ayrı bir tavada sarımsak, bal, salça, sirke, pul biber ve çeyrek bardak suyu 2 dk kaynatıp parlak bir sos yapın.",
      "Kızarmış çıtır tavukları sosla hızlıca harmanlayıp üzerine susam serpin."
    ]
  },
  {
    "title": "Sebzeli & Yumurtalı Kızarmış Pilav (Fried Rice)",
    "country": "🇯🇵 Asya",
    "cat": "bakliyat_pilav",
    "prep": 10,
    "cook": 10,
    "cal": 310,
    "ings": [
      [
        "pirinç",
        2,
        "su bardağı"
      ],
      [
        "yumurta",
        2,
        "adet"
      ],
      [
        "havuç",
        1,
        "adet"
      ],
      [
        "bezelye",
        0.5,
        "su bardağı"
      ],
      [
        "mısır konservesi",
        0.5,
        "su bardağı"
      ],
      [
        "taze soğan",
        4,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "tereyağı",
        1,
        "yemek kaşığı"
      ],
      [
        "sıvı yağ",
        2,
        "yemek kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "Bir gün önceden kalan soğuk pirinç pilavını değerlendirmek için dünyadaki en lezzetli tariftir; soğuk pilav tavada tane tane kızarır.",
    "serve": "Üzerine bol ince kıyılmış taze soğan serperek sıcak servis edin.",
    "steps": [
      "Tavada çırpılmış yumurtaları pişirip küçük parçalara ayırın.",
      "Aynı tavada minik küp doğranmış havuç, bezelye, mısır ve sarımsağı 3-4 dk yüksek ateşte soteleyin.",
      "Haşlanmış pirinci/pilavı ve taze soğanları ekleyip 3 dk yüksek ateşte kavurarak servis yapın."
    ]
  },
  {
    "title": "Kore Usulü Çıtır Sebzeli Mücver / Pankek (Yachaejeon)",
    "country": "🇰🇷 Kore",
    "cat": "dunya_mutfagi",
    "prep": 10,
    "cook": 10,
    "cal": 240,
    "ings": [
      [
        "kabak",
        1,
        "adet"
      ],
      [
        "havuç",
        1,
        "adet"
      ],
      [
        "patates",
        1,
        "adet"
      ],
      [
        "taze soğan",
        5,
        "adet"
      ],
      [
        "un",
        1,
        "su bardağı"
      ],
      [
        "nişasta",
        2,
        "yemek kaşığı"
      ],
      [
        "su",
        0.75,
        "su bardağı"
      ],
      [
        "yumurta",
        1,
        "adet"
      ],
      [
        "sıvı yağ",
        4,
        "yemek kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Hamura 2 kaşık nişasta ve buz gibi soğuk su eklemek Kore sebze pankekinin ekstra çıtır olmasını sağlar.",
    "serve": "Dilimleyerek sirkeli ve pul biberli sos eşliğinde sıcak servis edin.",
    "steps": [
      "Tüm sebzeleri ince kibrit çöpü (jülyen) şeklinde doğrayın.",
      "Un, nişasta, soğuk su, yumurta ve tuzu çırpıp sebzelerle karıştırın.",
      "Geniş tavada ince bir tabaka halinde yayıp her iki yüzünü altın sarısı ve çıtır olana dek kızartın."
    ]
  },
  {
    "title": "Hint Usulü Tereyağlı Tavuk (Butter Chicken)",
    "country": "🇮🇳 Hint",
    "cat": "dunya_mutfagi",
    "prep": 20,
    "cook": 25,
    "cal": 430,
    "ings": [
      [
        "tavuk göğsü",
        500,
        "gram"
      ],
      [
        "yoğurt",
        3,
        "yemek kaşığı"
      ],
      [
        "tereyağı",
        3,
        "yemek kaşığı"
      ],
      [
        "krema",
        1,
        "paket"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        3,
        "diş"
      ],
      [
        "domates",
        3,
        "adet"
      ],
      [
        "salça",
        1,
        "yemek kaşığı"
      ],
      [
        "kimyon",
        1,
        "tatlı kaşığı"
      ],
      [
        "pul biber",
        1,
        "tatlı kaşığı"
      ],
      [
        "tarçın",
        0.5,
        "çay kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Domatesli ve soğanlı sosu kremayı eklemeden önce blenderdan geçirirseniz restoranlardaki gibi kadife dokulu bir sos elde edersiniz.",
    "serve": "Sıcak lavaş/bazlama ekmeği ve pirinç pilavı ile servis edin.",
    "steps": [
      "Tavukları yoğurt, sarımsak, kimyon ve tuz ile harmanlayıp tavada 1 kaşık tereyağında yüksek ateşte kızartın.",
      "Ayrı tavada kalan tereyağında soğan, domates, salça ve baharatları pişirip pürüzsüz olana dek çekin.",
      "Sosa kremayı ve kızarmış tavukları ekleyip kısık ateşte 8 dakika özleştirin."
    ]
  },
  {
    "title": "Kremalı & Baharatlı Hint Mercimek Yemeği (Tadka Dal)",
    "country": "🇮🇳 Hint",
    "cat": "bakliyat_pilav",
    "prep": 10,
    "cook": 25,
    "cal": 280,
    "ings": [
      [
        "kırmızı mercimek",
        1.5,
        "su bardağı"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "domates",
        2,
        "adet"
      ],
      [
        "sarımsak",
        3,
        "diş"
      ],
      [
        "tereyağı",
        2,
        "yemek kaşığı"
      ],
      [
        "kimyon",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "pul biber",
        1,
        "tatlı kaşığı"
      ],
      [
        "maydanoz",
        0.25,
        "demet"
      ],
      [
        "su",
        4,
        "su bardağı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Mercimekleri çorba gibi sulu değil, koyu kıvamlı bir güveç gibi pişirin ve üzerine sarımsaklı kızgın tereyağı gezdirin.",
    "serve": "Pirinç pilavı veya sıcak bazlama ile servis edin.",
    "steps": [
      "Yıkanmış kırmızı mercimeği 4 bardak suyla koyu bir püre kıvamına gelene dek 18 dk haşlayın.",
      "Tavada tereyağında ince doğranmış soğan, sarımsak, kimyon, pul biber ve küp domatesleri kavurun.",
      "Kavrulan aromatik sosu mercimeğin üzerine döküp karıştırın, kıyılmış yeşillikle sunun."
    ]
  },
  {
    "title": "Fransız Usulü Fırında Ratatouille (Sebze Dizmesi)",
    "country": "🇫🇷 Fransız",
    "cat": "sebze_zeytinyagli",
    "prep": 20,
    "cook": 40,
    "cal": 210,
    "ings": [
      [
        "patlıcan",
        2,
        "adet"
      ],
      [
        "kabak",
        2,
        "adet"
      ],
      [
        "patates",
        2,
        "adet"
      ],
      [
        "domates",
        4,
        "adet"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        3,
        "diş"
      ],
      [
        "salça",
        1,
        "yemek kaşığı"
      ],
      [
        "zeytinyağı",
        0.5,
        "çay bardağı"
      ],
      [
        "kekik",
        1,
        "tatlı kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "Tüm sebzeleri aynı kalınlıkta (yaklaşık yarım cm) halka dilimlerseniz fırında hem görsel bir şölen oluşur hem de hepsi aynı anda pişer.",
    "serve": "Üzerine taze kekik ve zeytinyağı gezdirerek ana yemek veya et yanına garnitür olarak sunun.",
    "steps": [
      "Fırın kabının tabanına rendelenmiş 1 domates, salça, doğranmış soğan, sarımsak ve zeytinyağından oluşan sosu yayın.",
      "Halka doğranmış patlıcan, kabak, patates ve domatesleri sırayla yan yana sıkıca dizin.",
      "Üzerine zeytinyağı, tuz ve kekik gezdirip yağlı kağıt altında 190°C fırında 40 dk pişirin."
    ]
  },
  {
    "title": "Kremalı Fransız Patates Graten (Dauphinois)",
    "country": "🇫🇷 Fransız",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 35,
    "cal": 360,
    "ings": [
      [
        "patates",
        5,
        "adet"
      ],
      [
        "krema",
        1,
        "paket"
      ],
      [
        "süt",
        1,
        "su bardağı"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "tereyağı",
        1.5,
        "yemek kaşığı"
      ],
      [
        "kaşar peyniri",
        150,
        "gram"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "İnce dilimlediğiniz patatesleri kesinlikle suda yıkamayın; patatesin kendi nişastası krema ve sütle birleşip gratenin kalıp gibi çıkmasını sağlar.",
    "serve": "Et ve tavuk yemeklerinin yanında dilimleyerek sıcak servis edin.",
    "steps": [
      "Patatesleri soyup bıçak sırtı kalınlığında ince halkalar halinde dilimleyin.",
      "Süt, krema, ezilmiş sarımsak, tuz ve karabiberi karıştırıp patateslerle harmanlayın ve tereyağlanmış borcama dizin.",
      "190°C fırında 25 dk pişirin, üzerine kaşar peyniri serpip kızarana dek 10 dk daha fırınlayın."
    ]
  },
  {
    "title": "Karamelize Fransız Soğan Çorbası (Peynirli Ekmekli)",
    "country": "🇫🇷 Fransız",
    "cat": "corba",
    "prep": 15,
    "cook": 35,
    "cal": 260,
    "ings": [
      [
        "soğan",
        4,
        "adet"
      ],
      [
        "tereyağı",
        2.5,
        "yemek kaşığı"
      ],
      [
        "zeytinyağı",
        1,
        "yemek kaşığı"
      ],
      [
        "un",
        1.5,
        "yemek kaşığı"
      ],
      [
        "şeker",
        1,
        "çay kaşığı"
      ],
      [
        "et suyu",
        5,
        "su bardağı"
      ],
      [
        "bayat ekmek içi",
        4,
        "dilim"
      ],
      [
        "kaşar peyniri",
        100,
        "gram"
      ],
      [
        "kekik",
        0.5,
        "tatlı kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "Soğanları kısık ateşte sabırla 20 dakika karamelize etmek çorbaya acılık değil, muazzam bir tatlımsı derinlik katar.",
    "serve": "Üzerine kızarmış ekmek dilimi ve erimiş kaşar peyniri koyarak sıcak servis edin.",
    "steps": [
      "Piyazlık doğranmış soğanları tereyağı ve 1 çay kaşığı şekerle kısık ateşte altın kahverengi olana dek 20 dk karamelize edin.",
      "Unu ekleyip 2 dk kavurun, sıcak et suyunu ve kekiği ekleyip 15 dk kaynatın.",
      "Çorbayı kaselere alıp üzerine kaşarlı kızarmış ekmek dilimi yerleştirin."
    ]
  },
  {
    "title": "Beef Stroganoff (Kremalı & Mantarlı Avrupa Usulü Et)",
    "country": "🌍 Dünya Mutfağı",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 25,
    "cal": 440,
    "ings": [
      [
        "kuşbaşı et",
        450,
        "gram"
      ],
      [
        "mantar",
        250,
        "gram"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "krema",
        1,
        "paket"
      ],
      [
        "salatalık turşusu",
        4,
        "adet"
      ],
      [
        "tereyağı",
        2,
        "yemek kaşığı"
      ],
      [
        "un",
        1,
        "yemek kaşığı"
      ],
      [
        "et suyu",
        1,
        "su bardağı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "İnce jülyen doğranmış kornişon turşu, kremalı mantarlı etin ağırlığını alır ve Stroganoff'a imza lezzetini verir.",
    "serve": "Patates püresi, erişte veya tereyağlı pirinç pilavı üzerinde servis edin.",
    "steps": [
      "Jülyen doğranmış etleri kızgın tavada tereyağıyla mühürleyip kenara alın.",
      "Aynı tavada soğan, sarımsak ve mantarları soteleyin; 1 kaşık un ve et suyunu ekleyip kaynatın.",
      "Etleri, jülyen doğranmış turşuları ve kremayı ekleyip kısık ateşte 5-7 dk özleştirin."
    ]
  },
  {
    "title": "Viyana Usulü Çıtır Tavuk Şinitzel",
    "country": "🇦🇹 Avusturya",
    "cat": "dunya_mutfagi",
    "prep": 15,
    "cook": 12,
    "cal": 420,
    "ings": [
      [
        "tavuk göğsü",
        500,
        "gram"
      ],
      [
        "un",
        0.5,
        "su bardağı"
      ],
      [
        "yumurta",
        2,
        "adet"
      ],
      [
        "galeta unu",
        1,
        "su bardağı"
      ],
      [
        "sıvı yağ",
        1,
        "su bardağı"
      ],
      [
        "limon",
        1,
        "adet"
      ],
      [
        "tereyağı",
        1,
        "yemek kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "Tavuk göğsünü streç film arasında et döveceği veya bardak tabanıyla inceltirseniz içi sulu kalır ve 3 dakikada altın gibi kızarır.",
    "serve": "Üzerine limon dilimi ve 1 parça tereyağı koyarak patates salatası ile servis edin.",
    "steps": [
      "Tavuk göğüslerini enlemesine kesip incelterek tuz ve karabiberle lezzetlendirin.",
      "Sırasıyla una, çırpılmış yumurtaya ve galeta ununa bulayın.",
      "Kızgın yağda her iki yüzünü 3-4 dakika altın sarısı olana dek kızartın."
    ]
  },
  {
    "title": "Mac & Cheese (Fırında Peynir Soslu Amerikan Makarnası)",
    "country": "🇺🇸 Amerikan",
    "cat": "dunya_mutfagi",
    "prep": 10,
    "cook": 20,
    "cal": 460,
    "ings": [
      [
        "makarna",
        1,
        "paket"
      ],
      [
        "tereyağı",
        2.5,
        "yemek kaşığı"
      ],
      [
        "un",
        2,
        "yemek kaşığı"
      ],
      [
        "süt",
        2.5,
        "su bardağı"
      ],
      [
        "kaşar peyniri",
        250,
        "gram"
      ],
      [
        "galeta unu",
        2,
        "yemek kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ],
      [
        "pul biber",
        0.5,
        "çay kaşığı"
      ]
    ],
    "tip": "Peynirin sos içinde ipek gibi erimesi için sütü kaynatıp ocağı kapattıktan sonra rendelenmiş peyniri ekleyin.",
    "serve": "Üzeri çıtır kızarmış olarak sıcak servis edin.",
    "steps": [
      "Dirsek veya burgu makarnayı tuzlu suda 7 dakika haşlayın.",
      "Tereyağında unu kavurup sütü ekleyin, koyulaşınca ocaktan alıp peynirin üçte ikisini içinde eritin.",
      "Makarnayla sosu karıştırıp borcama dökün, kalan peyniri ve galeta ununu serpip 200°C fırında 12 dk kızartın."
    ]
  },
  {
    "title": "Amerikan Usulü Pankek (Kabarık Kahvaltı Keki)",
    "country": "🥞 Dünya Mutfağı",
    "cat": "kahvalti",
    "prep": 10,
    "cook": 10,
    "cal": 270,
    "ings": [
      [
        "yumurta",
        2,
        "adet"
      ],
      [
        "şeker",
        2,
        "yemek kaşığı"
      ],
      [
        "süt",
        1,
        "su bardağı"
      ],
      [
        "sıvı yağ",
        2,
        "yemek kaşığı"
      ],
      [
        "un",
        1.5,
        "su bardağı"
      ],
      [
        "kabartma tozu",
        1,
        "paket"
      ],
      [
        "vanilya",
        1,
        "paket"
      ],
      [
        "bal",
        2,
        "yemek kaşığı"
      ]
    ],
    "tip": "Pankekleri tavaya döktükten sonra üzerinde göz göz kabarcıklar çıkıp patlayana kadar çevirmeyin; bu sayede sünger gibi kabarır.",
    "serve": "Bal, pekmez, çikolata kreması ve taze meyvelerle sıcak servis edin.",
    "steps": [
      "Yumurta ve şekeri köpürene dek çırpın, süt ve sıvı yağı ekleyin.",
      "Un, kabartma tozu ve vanilyayı eleyerek katıp akışkan ama koyu bir hamur elde edin.",
      "Yağsız yanmaz tavaya birer kepçe döküp göz göz olunca arkalı önlü pişirin."
    ]
  },
  {
    "title": "San Sebastian Cheesecake (Yanık İspanyol Cheesecake)",
    "country": "🇪🇸 İspanyol",
    "cat": "tatli",
    "prep": 15,
    "cook": 28,
    "cal": 390,
    "ings": [
      [
        "labne",
        2,
        "paket"
      ],
      [
        "krema",
        2,
        "paket"
      ],
      [
        "şeker",
        1,
        "su bardağı"
      ],
      [
        "yumurta",
        4,
        "adet"
      ],
      [
        "un",
        2,
        "yemek kaşığı"
      ],
      [
        "vanilya",
        1,
        "paket"
      ]
    ],
    "tip": "Malzemelerin tamamı oda sıcaklığında olmalı ve fırından çıkarırken ortası hafif sallanır (jöle gibi) kıvamda kalmalıdır; soğudukça tam kıvamını alır.",
    "serve": "Buzdolabında dinlendirdikten sonra dilimleyip eritilmiş çikolata sosla servis edin.",
    "steps": [
      "Labne ve şekeri pürüzsüz olana dek çırpın, kremayı ekleyin.",
      "Yumurtaları tek tek kırıp karıştırın, elenmiş un ve vanilyayı spatula ile yedirin.",
      "Yağlı kağıt serili kalıpta 230°C fırında üzeri karamelize olana dek 25-28 dk pişirin."
    ]
  },
  {
    "title": "Lübnan Usulü Çıtır Falafel (Nohut Köftesi)",
    "country": "🇱🇧 Orta Doğu",
    "cat": "dunya_mutfagi",
    "prep": 20,
    "cook": 12,
    "cal": 310,
    "ings": [
      [
        "nohut",
        2,
        "su bardağı"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        3,
        "diş"
      ],
      [
        "maydanoz",
        0.5,
        "demet"
      ],
      [
        "un",
        2,
        "yemek kaşığı"
      ],
      [
        "kabartma tozu",
        1,
        "çay kaşığı"
      ],
      [
        "kimyon",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "karabiber",
        0.5,
        "çay kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ],
      [
        "sıvı yağ",
        1,
        "su bardağı"
      ]
    ],
    "tip": "Gerçek falafel haşlanmış nohutla değil, 1 gece suda bekletilmiş çiğ nohutun robottan çekilmesiyle yapılır; böylece yağda asla dağılmaz.",
    "serve": "Tahinli yoğurt sosu, salata ve sıcak lavaş ile servis edin.",
    "steps": [
      "Islatılmış nohut, soğan, sarımsak, maydanoz ve baharatları mutfak robotunda kum kıvamına gelene dek çekin.",
      "Un ve kabartma tozunu ekleyip yoğurun, ceviz büyüklüğünde köfteler yapın.",
      "Kızgın yağda dışı çıtır kahverengi olana kadar kızartın."
    ]
  },
  {
    "title": "Tavuklu Sezar Salata (Kıtır Ekmekli & Özel Soslu)",
    "country": "🥗 Dünya Mutfağı",
    "cat": "salata_meze",
    "prep": 15,
    "cook": 10,
    "cal": 320,
    "ings": [
      [
        "tavuk göğsü",
        350,
        "gram"
      ],
      [
        "marul",
        1,
        "adet"
      ],
      [
        "bayat ekmek içi",
        3,
        "dilim"
      ],
      [
        "kaşar peyniri",
        60,
        "gram"
      ],
      [
        "mayonez",
        2,
        "yemek kaşığı"
      ],
      [
        "yoğurt",
        2,
        "yemek kaşığı"
      ],
      [
        "sarımsak",
        1,
        "diş"
      ],
      [
        "limon",
        0.5,
        "adet"
      ],
      [
        "zeytinyağı",
        3,
        "yemek kaşığı"
      ],
      [
        "kekik",
        1,
        "çay kaşığı"
      ],
      [
        "tuz",
        1,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Küp doğradığınız ekmekleri sarımsaklı ve kekikli zeytinyağıyla tavada kıtırlaşana kadar kavurursanız hazır krutonlardan çok daha lezzetli olur.",
    "serve": "Üzerine ızgara tavuk dilimleri ve ince tıraşlanmış peynir ekleyerek hemen servis edin.",
    "steps": [
      "Küp doğranmış ekmekleri 1 kaşık zeytinyağı ve kekikle tavada kıtırlaşana dek kavurun.",
      "Tavuk göğsünü ızgara/tavada kızartıp dilimleyin.",
      "Mayonez, yoğurt, ezilmiş sarımsak, limon suyu ve zeytinyağını çırpıp doğranmış marullarla harmanlayın, üzerine tavuk ve kıtır ekmekleri dizin."
    ]
  },
  {
    "title": "Yunan Usulü Fırında Moussaka (Beşamel Soslu Patlıcan & Kıyma)",
    "country": "🇬🇷 Yunan",
    "cat": "dunya_mutfagi",
    "prep": 25,
    "cook": 35,
    "cal": 430,
    "ings": [
      [
        "patlıcan",
        4,
        "adet"
      ],
      [
        "patates",
        2,
        "adet"
      ],
      [
        "kıyma",
        350,
        "gram"
      ],
      [
        "soğan",
        1,
        "adet"
      ],
      [
        "sarımsak",
        2,
        "diş"
      ],
      [
        "domates",
        2,
        "adet"
      ],
      [
        "salça",
        1,
        "yemek kaşığı"
      ],
      [
        "süt",
        2,
        "su bardağı"
      ],
      [
        "un",
        2,
        "yemek kaşığı"
      ],
      [
        "tereyağı",
        2,
        "yemek kaşığı"
      ],
      [
        "kaşar peyniri",
        100,
        "gram"
      ],
      [
        "tarçın",
        0.25,
        "çay kaşığı"
      ],
      [
        "tuz",
        1.5,
        "tatlı kaşığı"
      ]
    ],
    "tip": "Yunan musakkasını Türk musakkasından ayıran özellik en üst katındaki kalın beşamel sosu ve kıymasına atılan bir çimdik tarçındır.",
    "serve": "Dilimlerin düzgün çıkması için fırından çıktıktan sonra 15 dakika dinlendirip servis edin.",
    "steps": [
      "Halka dilimlenmiş patates ve patlıcanları fırında veya az yağda ön pişirmeden geçirin.",
      "Kıyma, soğan, sarımsak, salça, domates ve bir çimdik tarçınla iç harcı pişirin.",
      "Borcama patates, patlıcan ve kıymayı dizin; üzerine beşamel sos ve kaşar peyniri yayıp 190°C fırında kızartın."
    ]
  }
];
