import type { Recipe, RecipeCategory, RecipeIngredient, RecipeStep } from '../types/recipe';
import { COMPACT_TURKISH_ARCHIVE, WORLD_CUISINE_RAW } from './generatedArchive';
import { REGIONAL_ANATOLIAN_CATALOG } from './regionalTurkishCatalog';
import { ALL_RECIPES } from './recipes';
import { canonicalizeIngredientName, COMPOSITE_INGREDIENT_EXPANSIONS } from './ingredients';
import { resolveDishVisualTheme } from '../components/DishVisualHeader';

const CATEGORY_EMOJI: Record<Exclude<RecipeCategory, 'tumu'>, string> = {
  corba: '🥣',
  et_tavuk: '🍖',
  sebze_zeytinyagli: '🫒',
  bakliyat_pilav: '🍚',
  hamur_borek: '🥐',
  kahvalti: '🍳',
  salata_meze: '🥗',
  tatli: '🍮',
  dunya_mutfagi: '🌍',
};

/**
 * Malzeme adına göre ev hanımlarının işini kolaylaştıran ön hazırlık & doğrama ipucu üretir
 */
export function inferIngredientPrepNote(name: string, dishCategory: string): string | undefined {
  const lower = name.toLowerCase().trim();
  if (lower.includes('soğan') && !lower.includes('taze') && !lower.includes('arpacık')) {
    return 'Yemeklik ince küp doğranmış';
  }
  if (lower.includes('arpacık soğan')) {
    return 'Kabukları soyulmuş bütün halde';
  }
  if (lower.includes('sarımsak')) {
    return 'İnce kıyılmış veya havanda ezilmiş';
  }
  if (lower.includes('pirinç')) {
    return 'Berrak su çıkana dek yıkanıp süzülmüş';
  }
  if (lower.includes('kuru fasulye') || lower.includes('nohut') || lower.includes('buğday')) {
    return 'Önceden ıslatılıp yumuşayana dek haşlanmış';
  }
  if (lower.includes('mercimek') || lower.includes('bulgur')) {
    return 'Bol suda yıkanıp süzülmüş';
  }
  if (lower.includes('patlıcan') && !lower.includes('kuru')) {
    return 'Alacalı soyulup tuzlu suda 15 dk acısı alınmış';
  }
  if (lower.includes('kuru patlıcan') || lower.includes('kuru biber')) {
    return 'Kaynar suda 8-10 dk yumuşayana dek haşlanmış';
  }
  if (lower.includes('kuşbaşı')) {
    return 'Suyunu salmaması için kızgın tencerede mühürlenecek';
  }
  if (lower.includes('kıyma')) {
    return 'Orta yağlı, oda sıcaklığında';
  }
  if (lower.includes('yumurta') || lower.includes('yoğurt') || lower.includes('süt')) {
    return 'Oda sıcaklığında';
  }
  if (lower === 'un') {
    return dishCategory === 'tatli' || dishCategory === 'hamur_borek'
      ? 'Topaklanmaması için elenmiş'
      : 'Kavurma / terbiye için';
  }
  if (lower.includes('tereyağı')) {
    return 'Yakmadan eritilecek';
  }
  if (lower.includes('maydanoz') || lower.includes('dereotu') || lower.includes('taze soğan')) {
    return 'Ayıklanıp ince kıyılmış';
  }
  return undefined;
}

/**
 * Malzeme adına ve yemek kategorisine göre 4 kişilik standart ve gerçekçi bir Türk mutfağı ölçüsü döndürür
 */
export function inferTurkishIngredientAmount(name: string, dishCategory: string): RecipeIngredient {
  const lower = name.toLowerCase().trim();
  const note = inferIngredientPrepNote(lower, dishCategory);

  // Et, tavuk, balık, mantar, sebze (gramajlı)
  if (
    lower.includes('kıyma') ||
    lower.includes('kuşbaşı') ||
    lower.includes('tavuk') ||
    lower.includes('kuzu') ||
    lower.includes('dana') ||
    lower.includes('bonfile') ||
    lower.includes('ciğer') ||
    lower.includes('hamsi') ||
    lower.includes('palamut') ||
    lower.includes('levrek') ||
    lower.includes('somon') ||
    lower.includes('balık') ||
    lower.includes('karides') ||
    lower.includes('kalamar') ||
    lower.includes('işkembe') ||
    lower.includes('kelle') ||
    lower.includes('paça')
  ) {
    return {
      name: lower,
      amount: dishCategory === 'corba' ? 200 : 400,
      unit: 'gram',
      note,
    };
  }

  if (
    lower.includes('ıspanak') ||
    lower.includes('taze fasulye') ||
    lower.includes('bamya') ||
    lower.includes('mantar') ||
    lower.includes('balkabağı') ||
    lower.includes('asma yaprağı') ||
    lower.includes('kadayıf')
  ) {
    return { name: lower, amount: 400, unit: 'gram', note };
  }

  if (
    lower.includes('peynir') ||
    lower.includes('sucuk') ||
    lower.includes('pastırma') ||
    lower.includes('çökelek') ||
    lower.includes('kaymak') ||
    lower.includes('kuyruk yağı') ||
    lower.includes('çikolata') ||
    lower.includes('kuru kayısı')
  ) {
    return { name: lower, amount: 150, unit: 'gram', note };
  }

  // Bakliyat, tahıl, un, şeker, süt, yoğurt
  if (
    lower.includes('pirinç') ||
    lower.includes('bulgur') ||
    lower.includes('mercimek') ||
    lower.includes('nohut') ||
    lower.includes('kuru fasulye') ||
    lower.includes('barbunya') ||
    lower.includes('buğday') ||
    lower.includes('irmik') ||
    lower.includes('erişte') ||
    lower.includes('börülce') ||
    lower.includes('bakla') ||
    lower.includes('mısır')
  ) {
    if (
      dishCategory === 'corba' &&
      (lower.includes('pirinç') || lower.includes('bulgur') || lower.includes('şehriye'))
    ) {
      return { name: lower, amount: 0.5, unit: 'çay bardağı', note };
    }
    return { name: lower, amount: 1.5, unit: 'su bardağı', note };
  }

  if (lower.includes('şehriye')) {
    return { name: lower, amount: 0.5, unit: 'çay bardağı', note };
  }

  if (lower === 'un' || lower.includes('mısır unu') || lower.includes('buğday unu')) {
    if (dishCategory === 'corba') {
      return { name: lower, amount: 1.5, unit: 'yemek kaşığı', note };
    }
    return { name: lower, amount: 2.5, unit: 'su bardağı', note };
  }

  if (lower === 'süt') {
    return {
      name: lower,
      amount: dishCategory === 'tatli' ? 4 : 1.5,
      unit: 'su bardağı',
      note,
    };
  }

  if (lower.includes('yoğurt')) {
    return { name: lower, amount: 1.5, unit: 'su bardağı', note };
  }

  if (
    lower.includes('su') &&
    !lower.includes('susam') &&
    !lower.includes('sucuk') &&
    !lower.includes('sumak')
  ) {
    if (
      lower.includes('limon suyu') ||
      lower.includes('portakal suyu') ||
      lower.includes('gül suyu') ||
      lower.includes('koruk')
    ) {
      return { name: lower, amount: 3, unit: 'yemek kaşığı', note };
    }
    return {
      name: lower,
      amount: dishCategory === 'corba' ? 5.5 : 2.5,
      unit: 'su bardağı',
      note: 'Sıcak / Kaynar',
    };
  }

  if (lower.includes('şeker')) {
    if (dishCategory === 'sebze_zeytinyagli' || dishCategory === 'salata_meze') {
      return { name: lower, amount: 1, unit: 'tatlı kaşığı', note: 'Lezzet dengelemek için' };
    }
    return { name: lower, amount: 1.5, unit: 'su bardağı', note };
  }

  // Yağ, salça, sos, nişasta, kuruyemiş
  if (
    lower.includes('yağ') ||
    lower.includes('salça') ||
    lower.includes('sirke') ||
    lower.includes('nar ekşisi') ||
    lower.includes('koruk ekşisi') ||
    lower.includes('tahin') ||
    lower.includes('pekmez') ||
    lower.includes('haşhaş ezmesi') ||
    lower.includes('bal') ||
    lower.includes('mayonez') ||
    lower.includes('galeta') ||
    lower.includes('nişasta') ||
    lower.includes('pirinç unu') ||
    lower.includes('kakao') ||
    lower.includes('tarhana') ||
    lower.includes('ceviz') ||
    lower.includes('fındık') ||
    lower.includes('badem') ||
    lower.includes('fıstık') ||
    lower.includes('üzüm') ||
    lower.includes('hindistan cevizi') ||
    lower.includes('susam')
  ) {
    return { name: lower, amount: 2, unit: 'yemek kaşığı', note };
  }

  if (lower.includes('sarımsak')) {
    return { name: lower, amount: 3, unit: 'diş', note };
  }

  if (
    lower.includes('maydanoz') ||
    lower.includes('dereotu') ||
    lower.includes('reyhan') ||
    lower.includes('roka') ||
    lower.includes('semizotu') ||
    lower.includes('pazı') ||
    lower.includes('taze nane') ||
    lower.includes('otu')
  ) {
    return { name: lower, amount: 0.5, unit: 'demet', note };
  }

  if (
    lower.includes('kabartma tozu') ||
    lower.includes('vanilya') ||
    lower.includes('maya') ||
    lower.includes('makarna') ||
    lower.includes('krema') ||
    lower.includes('krem şanti') ||
    lower.includes('bisküvi') ||
    lower.includes('milföy') ||
    lower.includes('baklavalık yufka')
  ) {
    return { name: lower, amount: 1, unit: 'paket', note };
  }

  if (
    lower === 'tuz' ||
    lower.includes('kaya tuzu') ||
    lower.includes('karabiber') ||
    lower.includes('pul biber') ||
    lower.includes('toz biber') ||
    lower.includes('isot') ||
    lower.includes('kimyon') ||
    lower.includes('kekik') ||
    lower.includes('nane') ||
    lower.includes('sumak') ||
    lower.includes('tarçın') ||
    lower.includes('yenibahar') ||
    lower.includes('zerdeçal') ||
    lower.includes('zencefil') ||
    lower.includes('çörek otu') ||
    lower.includes('karbonat') ||
    lower.includes('mahlep') ||
    lower.includes('muskat') ||
    lower.includes('karanfil')
  ) {
    return { name: lower, amount: 1, unit: 'tatlı kaşığı', note };
  }

  if (lower.includes('kuru patlıcan') || lower.includes('kuru biber')) {
    return { name: lower, amount: 12, unit: 'adet', note };
  }

  if (lower.includes('yufka')) {
    return { name: lower, amount: 3, unit: 'adet', note };
  }

  return { name: lower, amount: 2, unit: 'adet', note };
}

/**
 * Herkesin ilk denemede tam kıvamında yapabilmesi için 5 aşamalı, çok açıklayıcı ve kolay yaptırtıcı adım üretici
 */
export function buildAccurateTurkishSteps(
  title: string,
  cat: Exclude<RecipeCategory, 'tumu'>,
  ings: string[]
): RecipeStep[] {
  const lowerIngs = ings.map((i) => i.toLowerCase());
  const mainIngs = lowerIngs.filter(
    (i) =>
      !['su', 'tuz', 'karabiber', 'pul biber', 'sıvı yağ', 'zeytinyağı', 'tereyağı'].includes(i)
  );
  const spiceIngs = lowerIngs.filter((i) =>
    [
      'tuz',
      'karabiber',
      'pul biber',
      'toz biber',
      'kimyon',
      'kekik',
      'nane',
      'sumak',
      'isot',
      'tarçın',
      'yenibahar',
    ].includes(i)
  );

  const mainListText = mainIngs.slice(0, 5).join(', ');
  const spiceListText = spiceIngs.length > 0 ? spiceIngs.join(', ') : 'tuz ve baharatları';
  const t = title.toLowerCase();

  if (cat === 'corba') {
    const hasYogurt = lowerIngs.some((i) => i.includes('yoğurt'));
    return [
      {
        title: '1. Ön Hazırlık ve Malzemeleri Ölçme (Mise en Place)',
        instruction: `${title} için yukarıdaki listeden kişi sayısına göre ayarlanmış (${mainListText}) malzemelerinizi tezgaha dizin. Bakliyat veya tahıl varsa nişastası gidene kadar bol suda yıkayıp süzgece alın.`,
      },
      {
        title: '2. Tencere Bazını Kurma ve Haşlama',
        instruction: `Derin bir çorba tenceresini orta ateşe alın. Ana çorba malzemelerini ve suyunu ekleyerek kapağı yarı aralık şekilde malzemeler yumuşayana kadar kaynamaya bırakın. Üzerinde oluşan köpükleri kevgirle alın.`,
        timerMinutes: 15,
      },
      {
        title: hasYogurt
          ? '3. Kesilmeyen Tam Kıvamlı Terbiye Bağlama'
          : '3. Kıvam Bağlama ve Özleştirme',
        instruction: hasYogurt
          ? `Ayrı bir çukur kasede yoğurt, un ve yumurtayı pürüzsüz olana dek çırpın. Kaynayan çorbanın suyundan 2 kepçe alıp terbiyeye yavaşça ekleyin (ılıştırın). Ardından sürekli karıştırarak tencereye dökün; böylece çorbanız asla kesilmez.`
          : `Soğan, salça veya un bazını ayrı bir tavada kokusu çıkana kadar çevirip kaynayan çorbaya ilave edin. Pürüzsüz kıvam isteniyorsa blenderdan geçirin veya taneli bırakın.`,
        timerMinutes: 10,
      },
      {
        title: '4. Tereyağlı & Baharatlı Meyane Sosu',
        instruction: `Küçük bir sos tavasında tereyağını yakmadan eritin. İçine ${spiceListText} ekleyip 10-15 saniye kokusu çıkana kadar kızdırın ve fokurdayan çorbanın üzerine gezdirin.`,
        timerMinutes: 3,
      },
      {
        title: '5. Dinlendirme ve Sıcak Servis',
        instruction: `Ocağın altını kapattıktan sonra çorbanın kıvamının oturması için 5 dakika dinlendirin. Kepçeyle karıştırıp kaselere paylaştırın, yanında limon dilimleriyle sıcak servis edin.`,
      },
    ];
  }

  if (cat === 'tatli') {
    if (t.includes('şerbet') || t.includes('hoşaf') || t.includes('komposto')) {
      return [
        {
          title: '1. Meyve ve Baharatların Yıkanması',
          instruction: `${title} için (${mainListText}) malzemelerini bol soğuk suda yıkayın. Kuru meyve kullanıyorsanız 10 dakika ılık suda bekletip süzün.`,
        },
        {
          title: '2. Aromaların Suya Geçmesi ve Kaynatma',
          instruction: `Derin bir tencereye suyu, meyveleri ve çubuk tarçın/karanfili alın. Orta ateşte meyveler yumuşayıp rengini suya verene kadar kaynatın.`,
          timerMinutes: 18,
        },
        {
          title: '3. Şeker Dengesi ve Soğuk Servis',
          instruction: `Kişi sayısına göre ölçülmüş şekeri ekleyip 5 dakika daha kaynatın. Ocaktan alıp oda sıcaklığına gelince buzdolabında iyice soğutarak servis edin.`,
          timerMinutes: 5,
        },
      ];
    }

    const hasMilk = lowerIngs.some((i) => i.includes('süt'));
    return [
      {
        title: '1. Oda Sıcaklığı ve Malzeme Hazırlığı',
        instruction: `${title} yapımına başlamadan önce (${mainListText}) malzemelerini kişi sayısına göre tam ölçüsüyle tezgaha hazırlayın. Yumurta ve süt gibi malzemelerin oda sıcaklığında olması tatlının tam kabarmasını ve kıvam almasını sağlar.`,
      },
      {
        title: hasMilk
          ? '2. Topaklanmayan İpeksi Karışım Hazırlama'
          : '2. Hamur / Harç ve Şerbet Dengesi',
        instruction: hasMilk
          ? `Tencereye ocağı açmadan önce süt, şeker ve un/nişasta gibi kuru malzemeleri alıp çırpma teliyle tamamen pürüzsüz olana dek karıştırın (ocağı sonradan açmak topaklanmayı %100 önler).`
          : `Şerbetli tatlılarda temel kural "biri sıcak, biri soğuk" dengesidir. Önce şerbeti kaynatıp ılımaya bırakın, ardından tatlı harcını pürüzsüzce birleştirin.`,
        timerMinutes: 10,
      },
      {
        title: '3. Kıvam Alana Kadar Sabırlı Pişirme',
        instruction: hasMilk
          ? `Orta-kısık ateşte dibinin tutmaması için sürekli karıştırarak göz göz olup koyulaşana kadar pişirin. Ocaktan alırken tereyağı ve vanilyasını ekleyip mikserle/çırpıcıyla 2 dakika çırpın.`
          : `Hazırladığınız tatlıyı uygun tepsi/kalıba yerleştirip altı ve üstü altın sarısı rengini alana kadar kontrollü ateşte veya önceden ısıtılmış 180°C fırında pişirin.`,
        timerMinutes: 22,
      },
      {
        title: '4. Lezzetlerin Buluşması ve Dinlendirme',
        instruction: `Pişen tatlıyı ilk sıcağı çıktıktan (yaklaşık 5 dakika) sonra sosu veya şerbetiyle buluşturun. Tatlının içini çekmesi ve dilimlenebilir kıvama gelmesi için en az 30-45 dakika dinlendirin.`,
        timerMinutes: 30,
      },
      {
        title: '5. Süsleme ve Porsiyonlama',
        instruction: `Dinlenen ${title} tatlısını dilimleyin veya kaselere paylaştırın. Üzerini ceviz, fındık, Antep fıstığı, tarçın veya kaymak ile zenginleştirerek ikram edin.`,
      },
    ];
  }

  if (cat === 'hamur_borek') {
    return [
      {
        title: '1. İç Harcın Hazırlanması ve Soğutulması',
        instruction: `${title} için önce iç harçta kullanılacak malzemeleri (${mainListText}) hazırlayın. Pişen bir iç harçsa hamuru yırtmaması için mutlaka ılımaya bırakın.`,
      },
      {
        title: '2. Hamur Kıvamı veya Yufka Sosunun Çırpılması',
        instruction: `Yufkalı bir tarifse süt, yağ ve yumurta sosunu bir kasede çırpın. El açması/mayalı hamursa unu azar azar ekleyerek kulak memesi yumuşaklığında, ele yapışmayan pürüzsüz bir hamur yoğurun.`,
        timerMinutes: 12,
      },
      {
        title: '3. Katlama, Şekil Verme ve Tepsiye Dizme',
        instruction: `Hamuru veya yufkaları eşit parçalara bölün. Hazırladığınız iç harcı kenarlarından taşmayacak şekilde paylaştırıp rulo, gül veya tepsi katları halinde özenle sarın.`,
      },
      {
        title: '4. Nar Gibi Kızartma (Fırın / Sac / Tava)',
        instruction: `Üzerine kalan sosu veya yumurta sarısını sürüp susam/çörek otu serpin. Önceden ısıtılmış 190°C fırında (veya kızgın tavada) altı ve üstü altın sarısı olup çıtırlaşana dek pişirin.`,
        timerMinutes: 25,
      },
      {
        title: '5. İlk Sıcağını Alma ve Servis',
        instruction: `Fırından çıkan ${title} üzerine temiz bir mutfak bezi örterek 10 dakika dinlendirin; böylece dışı çıtır, içi yumuşacık kalır. Dilimleyerek sıcak servis yapın.`,
      },
    ];
  }

  if (cat === 'salata_meze') {
    if (t.includes('turşu')) {
      return [
        {
          title: '1. Sebzeleri Yıkama ve İğneleme',
          instruction: `${title} için (${mainListText}) malzemelerini bol soğuk suda yıkayın. Salatalık veya biberlerin içine salamura suyunun işlemesi için kürdanla birkaç yerinden delin.`,
        },
        {
          title: '2. Kavanoz Tabanı ve Sıkı Dizilim',
          instruction: `Cam kavanozun en altına fermantasyonu hızlandırmak için birkaç adet nohut ve soyulmuş sarımsak atın. Sebzeleri boşluk kalmayacak şekilde sıkıca dizin.`,
        },
        {
          title: '3. Tam Ölçülü Kaya Tuzu Salamurası',
          instruction: `Ayrı bir kapta içme suyu, kaya tuzu (sofra tuzu turşuyu eritir, mutlaka kaya tuzu kullanın), sirke ve limon suyunu eriyene kadar karıştırıp sebzelerin üzerini tamamen örtecek şekilde kavanoza dökün.`,
        },
        {
          title: '4. Kapatma ve Olgunlaştırma',
          instruction: `En üste limon dilimleri kapatıp kapağını hava almayacak şekilde sıkıca kapatın. Güneş görmeyen serin bir dolapta 10-15 gün sararıp kütür kütür olana dek bekletin.`,
        },
      ];
    }
    return [
      {
        title: '1. Yeşillik ve Sebzelerin Kurutulması',
        instruction: `${title} için (${mainListText}) malzemelerini bol suda yıkayıp iyice kurutun (ıslak kalan yeşillikler salatanın/mezenin sulanmasına yol açar).`,
      },
      {
        title: '2. Uygun Boyutta Doğrama / Ezme',
        instruction: `Malzemeleri ezmeden, keskin bir bıçakla aynı boyutta doğrayın veya tarifin usulüne göre rendeleyin/ezin.`,
      },
      {
        title: '3. Özel Sosun Ayrı Kasede Çırpılması',
        instruction: `Zeytinyağı, limon suyu, nar ekşisi ve ${spiceListText} malzemelerini küçük bir kasede emülsiyon (homojen sos) olana dek çırpın.`,
      },
      {
        title: '4. Harmanlama ve Dinlendirerek Sunum',
        instruction: `Sosu servis etmeden hemen önce malzemelerle buluşturup alttan üste doğru nazikçe karıştırın. Servis tabağına alıp üzerini süsleyerek ikram edin.`,
      },
    ];
  }

  if (cat === 'bakliyat_pilav') {
    return [
      {
        title: '1. Nişasta Akıtma ve Ön Hazırlık',
        instruction: `${title} için (${mainListText}) malzemelerini kişi sayısına göre ölçün. Pirinç, bulgur veya bakliyatı berrak su çıkana kadar yıkayıp süzgece alın; tane tane olması için iyice süzülmesi şarttır.`,
      },
      {
        title: '2. Tereyağında Kavurma Aşaması',
        instruction: `Yayvan bir tencerede tereyağı ve sıvı yağı ısıtın. Varsa şehriye, soğan veya et/yardımcı malzemeleri pembeleşene dek kavurun, ardından süzülen tahıl/bakliyatı ekleyip 3-4 dakika şeffaflaşana kadar çevirin.`,
        timerMinutes: 6,
      },
      {
        title: '3. Sıcak Su Ölçüsü ve Tuz Ayarı',
        instruction: `Üzerine kişi sayısına göre hesaplanmış kaynar suyunu (veya et/tavuk suyunu) ve ${spiceListText} ekleyin. Bir kez nazikçe karıştırıp kapağını kapatın.`,
      },
      {
        title: '4. Kısık Ateşte Göz Göz Pişirme',
        instruction: `İlk 2 dakika orta ateşte kaynadıktan sonra ocağı en kısık ayara getirin. Karıştırmadan, üzerinde küçük gözenekler oluşup suyunu tamamen çekene kadar pişirin.`,
        timerMinutes: 16,
      },
      {
        title: '5. Kağıt Havlu ile Demlendirme Sırrı',
        instruction: `Ocağı kapatın, tencere ile kapak arasına temiz bir kağıt havlu yerleştirip 15 dakika hiç açmadan demlendirin. Servis öncesi tahta kaşıkla kenardan ortaya doğru havalandırarak karıştırın.`,
        timerMinutes: 15,
      },
    ];
  }

  // Et, Tavuk, Sebze, Kahvaltı (Ana Yemekler)
  return [
    {
      title: '1. Malzemelerin Doğranması ve Ön Hazırlık',
      instruction: `${title} için kişi sayısına göre ölçeklenmiş (${mainListText}) malzemelerini tezgaha hazırlayın. Et veya tavuk varsa buzdolabından 15 dakika önce çıkarıp oda sıcaklığına getirin, sebzeleri eşit büyüklükte doğrayın.`,
    },
    {
      title: '2. Yüksek Ateşte Mühürleme / Soğan Bazı',
      instruction: `Uygun boyuttaki tencere veya tavayı iyice ısıtın. Ana malzemeyi (et/tavuk/sebze) ve doğranmış soğan/sarımsağı yağ ile birlikte suyunu salıp kurutmadan, rengi dönüp aroması çıkana kadar soteleyin.`,
      timerMinutes: 10,
    },
    {
      title: '3. Salça ve Baharatların Kokusu Çıkana Dek Kavrulması',
      instruction: `Salçayı ekleyip çiğ kokusu gidene kadar 2 dakika kavurun. Ardından ${spiceListText} ve diğer yardımcı sebzeleri ilave ederek tüm lezzetlerin birbirine geçmesini sağlayın.`,
      timerMinutes: 5,
    },
    {
      title: '4. Kısık Ateşte Lokum Kıvamında Pişirme',
      instruction: `Yemeğin sıcak suyunu ayarlayın. Kaynayana kadar orta ateşte, kaynadıktan sonra kapağı kapalı olarak kısık ateşte çatalla kontrol ettiğinizde malzemeler lokum gibi yumuşayana dek pişirin.`,
      timerMinutes: 25,
    },
    {
      title: '5. Dinlendirme ve Sıcak Servis',
      instruction: `Pişen ${title} yemeğini ocaktan aldıktan sonra sosunun kıvam bulması için 5-10 dakika dinlendirin. Sıcak olarak servis tabağına alın.`,
    },
  ];
}

let cachedFullArchive: Recipe[] | null = null;

function normalizeAndDeduplicateIngredients(
  ings: RecipeIngredient[],
  dishCategory: string = 'et_tavuk'
): RecipeIngredient[] {
  const seen = new Set<string>();
  const result: RecipeIngredient[] = [];
  for (let i = 0; i < ings.length; i++) {
    const rawLower = ings[i].name.toLowerCase().trim();
    const expandedNames = COMPOSITE_INGREDIENT_EXPANSIONS[rawLower];
    if (expandedNames) {
      for (let j = 0; j < expandedNames.length; j++) {
        const canonicalSub = canonicalizeIngredientName(expandedNames[j]);
        if (!seen.has(canonicalSub)) {
          seen.add(canonicalSub);
          result.push(inferTurkishIngredientAmount(canonicalSub, dishCategory));
        }
      }
      continue;
    }

    const canonicalName = canonicalizeIngredientName(rawLower);
    if (!seen.has(canonicalName)) {
      seen.add(canonicalName);
      result.push({
        ...ings[i],
        name: canonicalName,
      });
    }
  }
  return result;
}

export function getFullRecipeArchive(): Recipe[] {
  if (cachedFullArchive) return cachedFullArchive;

  const existingTitles = new Set(
    ALL_RECIPES.map((r) => r.title.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim())
  );

  // 1. Ana Detaylı Türk Mutfağı Tarifleri
  const taggedCoreRecipes: Recipe[] = ALL_RECIPES.map((r) => ({
    ...r,
    ingredients: normalizeAndDeduplicateIngredients(
      r.ingredients.map((ing) => ({
        ...ing,
        note: ing.note || inferIngredientPrepNote(ing.name, r.category),
      }))
    ),
    cuisineOrigin: r.cuisineOrigin || 'turkish',
    countryLabel: r.countryLabel || '🇹🇷 Türk Mutfağı',
  }));

  // 2. 81 İlden Tescilli Anadolu Yöresel Yemekleri + Nefis Ev Klasikleri
  const regionalRecipes: Recipe[] = [];
  REGIONAL_ANATOLIAN_CATALOG.forEach((reg, idx) => {
    const cleanTitle = reg.title.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
    if (existingTitles.has(cleanTitle)) return;
    existingTitles.add(cleanTitle);

    const visual = resolveDishVisualTheme(reg.title, reg.cat);
    const emoji = visual.iconEmoji || CATEGORY_EMOJI[reg.cat] || '🍲';

    regionalRecipes.push({
      id: `yoresel-${idx + 1}`,
      title: reg.title,
      subtitle: `${reg.region} Mutfağından Tam Ölçülü & Adım Adım Açıklamalı Tarif`,
      category: reg.cat,
      cuisineOrigin: 'turkish',
      countryLabel: `🇹🇷 ${reg.region}`,
      emoji,
      image: '',
      prepTime: 20,
      cookTime: reg.cat === 'salata_meze' || reg.cat === 'kahvalti' ? 15 : 35,
      difficulty: 'Kolay',
      caloriesPerServing: reg.cat === 'et_tavuk' ? 380 : reg.cat === 'tatli' ? 340 : 250,
      baseServings: 4,
      chefTip: `${reg.title} yaparken ${visual.cookwareHint} kullanmanız ve "${visual.heatHint}" kuralına uymanız yemeğin tam kıvamında olmasını sağlar.`,
      servingSuggestion: `Yanında ${reg.region} usulü köpüklü ayran, mevsim salatası veya taze ekmek ile servis edebilirsiniz.`,
      ingredients: normalizeAndDeduplicateIngredients(
        reg.ings.map((ingName) => inferTurkishIngredientAmount(ingName, reg.cat))
      ),
      steps: buildAccurateTurkishSteps(reg.title, reg.cat, reg.ings),
    });
  });

  // 3. V10'daki 350 Geleneksel Türk Mutfağı Tarifini 5 Aşamalı Detaylı Rehberle Dönüştür
  const convertedTurkish: Recipe[] = [];
  COMPACT_TURKISH_ARCHIVE.forEach((tr) => {
    const cleanTitle = tr.title.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
    if (existingTitles.has(cleanTitle)) return;
    existingTitles.add(cleanTitle);

    const visual = resolveDishVisualTheme(tr.title, tr.cat);
    const emoji = visual.iconEmoji || CATEGORY_EMOJI[tr.cat] || '🍲';

    // Her zaman açıklayıcı 5 adımlı rehber üret, varsa orijinal tarif notunu da 2. adıma entegre et
    const baseSteps = buildAccurateTurkishSteps(tr.title, tr.cat, tr.ings);
    if (tr.steps && tr.steps.length > 0) {
      const customSummary = tr.steps.join(' ');
      baseSteps[1] = {
        ...baseSteps[1],
        instruction: `${customSummary} (${baseSteps[1].instruction})`,
      };
    }

    convertedTurkish.push({
      id: tr.id,
      title: tr.title,
      subtitle: `${visual.patternLabel} • ${visual.cookwareHint}`,
      category: tr.cat,
      cuisineOrigin: 'turkish',
      countryLabel: '🇹🇷 Türk Mutfağı',
      emoji,
      image: '',
      prepTime: 15,
      cookTime: 30,
      difficulty: 'Kolay',
      caloriesPerServing: 275,
      baseServings: 4,
      chefTip: `${tr.title} yaparken malzemelerin oda sıcaklığında olmasına özen gösterin; ${visual.heatHint.toLowerCase()} yöntemiyle pişirmek lezzeti ikiye katlar.`,
      servingSuggestion: 'Yanında mevsim salata, süzme yoğurt veya sıcak pide ile servis edebilirsiniz.',
      ingredients: normalizeAndDeduplicateIngredients(
        tr.ings.map((ingName) => inferTurkishIngredientAmount(ingName, tr.cat))
      ),
      steps: baseSteps,
    });
  });

  // 4. Dünya Mutfağı Tariflerini Dönüştür
  const worldRecipes: Recipe[] = WORLD_CUISINE_RAW.map((w, idx) => {
    const cat = w.cat as Exclude<RecipeCategory, 'tumu'>;
    const visual = resolveDishVisualTheme(w.title, cat);
    return {
      id: `world-${idx + 1}`,
      title: w.title,
      subtitle: `${w.country} Mutfağından Evde Kolayca Yapabileceğiniz Tam Ölçülü Tarif`,
      category: cat,
      cuisineOrigin: 'world',
      countryLabel: w.country,
      emoji: visual.iconEmoji || '🌍',
      image: '',
      prepTime: w.prep,
      cookTime: w.cook,
      difficulty: 'Kolay',
      caloriesPerServing: w.cal,
      baseServings: 4,
      chefTip: w.tip,
      servingSuggestion: w.serve,
      ingredients: normalizeAndDeduplicateIngredients(
        w.ings.map(([name, amount, unit]) => ({
          name: String(name),
          amount: Number(amount),
          unit: unit as RecipeIngredient['unit'],
          note: inferIngredientPrepNote(String(name), cat),
        }))
      ),
      steps: w.steps.map((inst, sIdx) => ({
        title: `${sIdx + 1}. Aşama`,
        instruction: inst,
        timerMinutes: sIdx === 1 ? Math.max(5, Math.round(w.cook * 0.6)) : undefined,
      })),
    };
  });

  cachedFullArchive = [
    ...taggedCoreRecipes,
    ...regionalRecipes,
    ...worldRecipes,
    ...convertedTurkish,
  ];
  return cachedFullArchive;
}
