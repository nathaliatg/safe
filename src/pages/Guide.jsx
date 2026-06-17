import { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ChevronDown, Stethoscope, Info, Leaf, Wheat, Apple, Milk } from 'lucide-react';

const FODMAP_LETTERS = [
  { letter: 'F', full: 'Fermentáveis', desc: 'Carboidratos fermentados pelas bactérias intestinais, produzindo gases.' },
  { letter: 'O', full: 'Oligossacarídeos', desc: 'Frutanos e galacto-oligossacarídeos — encontrados em trigo, centeio, alho e cebola.' },
  { letter: 'D', full: 'Dissacarídeos', desc: 'Principalmente a lactose, presente no leite e derivados com lactose.' },
  { letter: 'M', full: 'Monossacarídeos', desc: 'Frutose livre em excesso — manga, maçã, mel.' },
  { letter: 'A', full: 'And (e)', desc: '' },
  { letter: 'P', full: 'Polióis', desc: 'Sorbitol e manitol — adoçantes artificiais e algumas frutas como ameixa e pêssego.' },
];

const symptoms = [
  'Inchaço e distensão abdominal',
  'Dor e cólicas abdominais',
  'Excesso de gases',
  'Diarreia e/ou constipação',
  'Sensação de evacuação incompleta',
  'Náuseas leves',
];

const allowedFoods = [
  { group: 'Cereais & Farinhas', icon: Wheat, color: 'peach',    items: ['Arroz branco e integral', 'Aveia sem glúten', 'Quinoa', 'Milho e polenta', 'Tapioca e polvilho', 'Farinha de arroz', 'Fécula de batata', 'Macarrão sem glúten'] },
  { group: 'Frutas',             icon: Apple, color: 'petal',    items: ['Morango', 'Mirtilo (blueberry)', 'Laranja e tangerina', 'Uva', 'Kiwi', 'Abacaxi (porção pequena)', 'Banana levemente verde', 'Limão e lima', 'Papaia'] },
  { group: 'Legumes & Verduras', icon: Leaf,  color: 'mint',     items: ['Cenoura', 'Pepino', 'Abobrinha', 'Espinafre e rúcula', 'Alface', 'Tomate (especialmente cereja)', 'Batata', 'Pimentão', 'Berinjela', 'Chuchu'] },
  { group: 'Proteínas',          icon: CheckCircle2, color: 'lavender', items: ['Frango, carne bovina, peixe', 'Ovos', 'Tofu firme', 'Tempeh', 'Frutos do mar'] },
  { group: 'Laticínios & Sub.',  icon: Milk, color: 'lavender', items: ['Leite sem lactose', 'Iogurte sem lactose', 'Queijos duros (parmesão, cheddar, meia-cura)', 'Leite de amêndoas sem açúcar', 'Leite de arroz', 'Manteiga'] },
  { group: 'Temperos & Outros',  icon: Leaf, color: 'mint',     items: ['Azeite com infusão de alho', 'Óleo de coco', 'Maple syrup', 'Açúcar cristal e mascavo', 'Cacau em pó', 'Chocolate amargo 70%+', 'Cebolinha verde (parte verde)', 'Gengibre', 'Canela, orégano, tomilho'] },
];

const avoidFoods = [
  { group: 'Cereais com glúten',    items: ['Trigo (pão, macarrão, farinha de trigo)', 'Centeio', 'Cevada', 'Cuscuz de trigo'] },
  { group: 'Frutas a evitar',       items: ['Maçã e suco de maçã', 'Pera', 'Manga', 'Melancia', 'Pêssego e nectarina', 'Ameixa', 'Banana bem madura', 'Figo'] },
  { group: 'Legumes & Temperos',    items: ['Cebola (qualquer tipo)', 'Alho (inteiro ou em pó)', 'Alho-poró (parte branca)', 'Brócolis (em grande quantidade)', 'Couve-flor', 'Aspargo', 'Cogumelos', 'Beterraba', 'Ervilha'] },
  { group: 'Laticínios c/ lactose', items: ['Leite de vaca integral', 'Queijo cottage e ricota', 'Iogurte com lactose', 'Sorvete convencional', 'Creme de leite'] },
  { group: 'Leguminosas',           items: ['Feijão, lentilha, grão-de-bico', 'Soja em grão', 'Ervilha seca'] },
  { group: 'Adoçantes & Outros',    items: ['Mel', 'Xarope de agave', 'Sorbitol, manitol, xilitol', 'Bebidas com frutose', 'Inulina (em muitos "fit")'] },
];

function Accordion({ title, icon: Icon, color, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const colorMap = {
    mint:     { bg: 'bg-mint-100',      icon: 'text-mint-500',      border: 'border-mint-200' },
    peach:    { bg: 'bg-peach-100',     icon: 'text-peach-500',     border: 'border-peach-200' },
    lavender: { bg: 'bg-lavender-100',  icon: 'text-lavender-500',  border: 'border-lavender-200' },
    petal:    { bg: 'bg-petal-100',     icon: 'text-petal-500',     border: 'border-petal-200' },
    gray:     { bg: 'bg-warm-gray-100', icon: 'text-warm-gray-500', border: 'border-warm-gray-200' },
  };
  const c = colorMap[color] ?? colorMap.gray;
  return (
    <div className={`bg-white rounded-2xl shadow-card border ${c.border} overflow-hidden`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
        {Icon && (
          <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={14} className={c.icon} />
          </div>
        )}
        <span className="text-sm font-semibold text-warm-gray-800 flex-1">{title}</span>
        <ChevronDown size={16} className={`text-warm-gray-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <ul className="flex flex-col gap-1.5">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Guide() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col gap-8 py-8">

      {/* Title */}
      <div className="pt-4 md:pt-0">
        <div className="inline-flex items-center gap-2 bg-[#e3cbec] px-3 py-1 rounded-full mb-3">
          <Info size={13} className="text-lavender-600" />
          <span className="text-lavender-700 text-xs font-semibold tracking-wide uppercase">Guia Low FODMAP</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-gray-800 leading-snug">O que são FODMAPs?</h1>
        <p className="text-sm text-warm-gray-400 mt-2 max-w-lg leading-relaxed">
          Entenda a dieta, quais alimentos evitar e como ela pode ajudar o seu intestino.
        </p>
      </div>

      {/* Aviso médico */}
      <div className="bg-petal-50 border-l-4 border-petal-400 rounded-r-2xl px-4 py-4 flex items-start gap-3">
        <Stethoscope size={20} className="text-petal-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-warm-gray-800 mb-1">Orientação médica necessária</p>
          <p className="text-xs text-warm-gray-600 leading-relaxed">
            A dieta low FODMAP é <strong>restritiva</strong> e não deve ser seguida sem acompanhamento profissional.
            Procure um <strong>médico gastroenterologista</strong> ou <strong>nutricionista</strong> especializado antes de iniciar.
            A dieta tem fases (eliminação, reintrodução e personalização) e deve ser conduzida com supervisão.
          </p>
        </div>
      </div>

      {/* Desktop: 2-col layout for the main content */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">

          {/* A sigla */}
          <div>
            <h2 className="text-base font-bold text-warm-gray-800 mb-3">A sigla FODMAP</h2>
            <div className="flex flex-col gap-2">
              {FODMAP_LETTERS.map(({ letter, full, desc }) => (
                <div key={letter} className="flex items-start gap-3 bg-white rounded-2xl px-4 py-3 shadow-card">
                  <span className="w-8 h-8 rounded-xl bg-[#e3cbec] flex items-center justify-center text-lavender-700 font-bold text-sm flex-shrink-0">
                    {letter}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-warm-gray-800">{full}</p>
                    {desc && <p className="text-xs text-warm-gray-400 mt-0.5 leading-relaxed">{desc}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-lavender-50 rounded-2xl px-4 py-3">
              <p className="text-xs text-warm-gray-600 leading-relaxed">
                São carboidratos de cadeia curta que <strong>algumas pessoas não conseguem digerir bem</strong>.
                Eles chegam ao intestino grosso praticamente intactos, são fermentados pelas bactérias intestinais
                e causam sintomas. Nem todos reagem da mesma forma — por isso a dieta é personalizada.
              </p>
            </div>
          </div>

          {/* Sintomas */}
          <div>
            <h2 className="text-base font-bold text-warm-gray-800 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-peach-400" />
              Sintomas comuns
            </h2>
            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="text-xs text-warm-gray-400 mb-3 leading-relaxed">
                Os FODMAPs podem provocar sintomas em pessoas com SII ou sensibilidade intestinal:
              </p>
              <div className="flex flex-col gap-2">
                {symptoms.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-peach-400 flex-shrink-0" />
                    <span className="text-sm text-warm-gray-700">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fases */}
          <div>
            <h2 className="text-base font-bold text-warm-gray-800 mb-3">Como funciona?</h2>
            <div className="flex flex-col gap-2">
              {[
                { num: '1', title: 'Eliminação', desc: 'Todos os alimentos ricos em FODMAPs são retirados por 2–6 semanas.', color: 'petal' },
                { num: '2', title: 'Reintrodução', desc: 'Alimentos são reintroduzidos um a um para identificar os gatilhos.', color: 'peach' },
                { num: '3', title: 'Personalização', desc: 'A dieta é ajustada para ser o menos restritiva possível para você.', color: 'mint' },
              ].map(({ num, title, desc, color }) => {
                const cm = { petal: 'bg-petal-100 text-petal-600', peach: 'bg-peach-100 text-peach-600', mint: 'bg-mint-100 text-mint-600' };
                return (
                  <div key={num} className="flex items-start gap-3 bg-white rounded-2xl px-4 py-3 shadow-card">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${cm[color]}`}>{num}</span>
                    <div>
                      <p className="text-sm font-semibold text-warm-gray-800">{title}</p>
                      <p className="text-xs text-warm-gray-400 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">

          {/* Permitidos */}
          <div>
            <h2 className="text-base font-bold text-warm-gray-800 mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-mint-500" />
              Alimentos permitidos
            </h2>
            <div className="flex flex-col gap-2">
              {allowedFoods.map(({ group, icon, color, items }) => (
                <Accordion key={group} title={group} icon={icon} color={color}>
                  {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-warm-gray-600">
                      <CheckCircle2 size={11} className="text-mint-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </Accordion>
              ))}
            </div>
          </div>

          {/* Evitar */}
          <div>
            <h2 className="text-base font-bold text-warm-gray-800 mb-3 flex items-center gap-2">
              <XCircle size={16} className="text-petal-500" />
              Alimentos a evitar
            </h2>
            <div className="flex flex-col gap-2">
              {avoidFoods.map(({ group, items }) => (
                <Accordion key={group} title={group} icon={XCircle} color="petal">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-warm-gray-600">
                      <XCircle size={11} className="text-petal-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </Accordion>
              ))}
            </div>
          </div>

          {/* Nota Monash */}
          <div className="bg-lavender-50 border border-lavender-200 rounded-2xl px-4 py-4 flex items-start gap-3">
            <Info size={16} className="text-lavender-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-warm-gray-600 leading-relaxed">
              Esta dieta foi desenvolvida pela <strong>Universidade de Monash</strong> (Austrália).
              O app oficial <strong>Monash FODMAP</strong> é a fonte mais atualizada para checar porções seguras de cada alimento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
