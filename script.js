var S,seen={};
try{seen=JSON.parse(localStorage.getItem("af_end")||"{}")}catch(e){}
var M=[["c","Credibilidade","var(--ok)"],["a","Alcance da verdade","var(--acc)"],["p","Pânico","var(--bad)"]];
var N={
start:{pl:"Segunda-feira, 7h12 · Redação da Gazeta do Bairro",
t:["Você é Marina, checadora de fatos. Antes mesmo do café, seu celular explode: um áudio circula nos grupos da cidade, a poucos dias do Festival das Águas.","Já são 3 mil compartilhamentos."],
msg:"“URGENTE! Um técnico da companhia de água confirmou: o reservatório foi contaminado! Não bebam e passem pra frente!!”",
ch:[["Repassar com um aviso: “só por precaução”","share",{c:-15,p:15}],["Investigar a origem do áudio","source",{c:5}],["Ligar para a companhia de água","call",{p:-5}]]},
share:{pl:"Meia hora depois",t:["Sua tia compartilha o seu aviso com 40 pessoas. A editora Helena liga: “Marina, a gente checa antes de alertar. O que você fez?”"],
ch:[["Apagar e publicar uma retratação sincera","source",{c:5,a:5,p:-5}],["Deixar lá: já está feito, apagar piora","source",{c:-15,p:15}]],
tip:"<b>Dica:</b> mesmo boas intenções espalham desinformação. Na dúvida, não repasse."},
source:{pl:"Rastreando a origem",t:["O áudio não tem data nem nome. Junto dele circula um PDF de “laudo laboratorial” com logotipo oficial. Dois fios para puxar."],
ch:[["Rastrear o laudo em PDF","laudo",{c:5}],["Procurar o dono da voz","voz",{c:5}]]},
call:{pl:"Assessoria de imprensa",t:["A assessoria promete uma nota em duas horas. Enquanto isso, os compartilhamentos já passam de 5 mil."],
ch:[["Esperar a nota oficial","note",{p:10}],["Procurar um laboratório independente enquanto espera","lab",{c:5}]]},
note:{pl:"A nota chega",t:["A companhia nega a contaminação. Nos comentários: “Eles sempre negam!”. Só a palavra oficial não convenceu ninguém."],
ch:[["Publicar apenas a nota oficial","publish",{c:-5,a:10}],["Complementar com checagem própria","source",{c:5}]],
tip:"<b>Dica:</b> negar não basta. Mostre provas que o leitor possa conferir."},
lab:{pl:"Universidade Federal",t:["A professora Beatriz, química, aceita analisar amostras, mas o resultado só sai em 3 horas. O boato não espera."],
ch:[["Esperar o resultado e publicar com dados","publish",{c:12,p:8},"lab"],["Publicar já: “sem indícios de contaminação”","publish",{c:-10,a:10}]],
tip:"<b>Dica:</b> afirmar sem evidência é o mesmo erro de quem espalha o boato."},
laudo:{pl:"Examinando o PDF",t:["O laudo é falso: logotipo de 2015, assinatura copiada de outro documento e um registro profissional que não existe.","Os metadados levam a uma conta que, curiosamente, vende filtros de água."],
ch:[["Mapear a rede de contas que espalhou o laudo","publish",{c:10},"rede"],["Ir direto para a publicação","publish",{a:5}]]},
voz:{pl:"Ligação com o “técnico”",t:["Você acha o dono da voz: Rui, técnico aposentado. O áudio é de 2019, de uma enchente em outra cidade. Alguém o recortou e inventou um contexto."],
ch:[["Gravar um vídeo curto com ele desmentindo","publish",{c:10,a:10},"video"],["Citar só por texto","publish",{c:5}]]},
publish:{pl:"Hora de publicar",t:["Você tem as evidências. Agora vem a decisão que define quem vai ver a verdade: como contar?"],
ch:[["Reportagem longa, técnica e detalhada","festival",{a:10,c:5}],["Card simples + vídeo curto + link com a checagem completa","festival",{a:25,c:5}],["Post debochado contra quem acreditou no boato","festival",{c:-15,a:10,p:5}]],
tip:"<b>Dica:</b> a correção precisa ser tão fácil de compartilhar quanto o boato."},
festival:{pl:"Terça, 18h · Pânico nas ruas",t:["Filas em supermercados: a água mineral acabou. O prefeito pensa em cancelar o Festival das Águas."],
ch:[["Propor uma coletiva ao vivo com prefeitura e laboratório","rumor",{a:15,p:-20,c:10}],["Pedir que os leitores “confiem em nós”, sem mostrar dados","rumor",{p:-5,c:-5}],["Ignorar e partir para a próxima pauta","rumor",{p:10}]]},
rumor:{pl:"Quarta, 9h · O contra-ataque",t:["Surge um novo áudio: "],msg:"“A checagem foi PAGA pela companhia! Jornalista vendida!”",
ch:[["Abrir fontes, dados e o passo a passo da checagem","end",{c:15,a:10,p:-10}],["Atacar publicamente quem fez o áudio","end",{c:-10,p:5}],["Denunciar a rede de contas às plataformas","end",{c:5,a:10},"rede",{c:10}]]}
};
function cl(v){return Math.max(0,Math.min(100,v))}
function start(){S={n:"start",c:50,a:10,p:40,f:{}};draw()}
function meters(){document.getElementById("meters").innerHTML=M.map(function(m){var v=S[m[0]];return '<div class="m"><b><span>'+m[1]+'</span><span>'+v+'</span></b><div class="bar"><i style="width:'+v+'%;background:'+m[2]+'"></i></div></div>'}).join("")}
function pick(i){var n=N[S.n],c=n.ch[i];var fx=c[2];for(var k in fx)S[k]=cl(S[k]+fx[k]);
 if(c[3]){S.f[c[3]]=1;if(c[4]&&S.f.rede&&c[3]==="rede"){}}
 if(c[4]&&S.f.rede&&S.n==="rumor"){for(var j in c[4])S[j]=cl(S[j]+c[4][j])}
 S.n=c[1];draw()}
function ending(){var g=S.c>=70&&S.a>=60&&S.p<=35,b=S.c<40||S.p>=60;
 if(g)return{k:"good",i:"🛡️",h:"Final 1 · Guardiã da Verdade",
 t:["A coletiva acalma a cidade, o card vira o conteúdo mais compartilhado da semana e a rede de contas falsas é derrubada. O festival acontece, lotado, e as pessoas passam a conferir antes de repassar.","Você provou que checar, explicar e ser transparente vence o boato."]};
 if(b)return{k:"bad",i:"🔥",h:"Final 3 · O Boato Viralizou",
 t:["Sua resposta chegou tarde, ou parecia mais uma briga. O áudio falso passou de 200 mil compartilhamentos, o festival foi cancelado e a confiança na imprensa caiu.","Desinformação cresce onde a verdade é lenta, confusa ou arrogante. Tente outro caminho."]};
 return{k:"mid",i:"⚖️",h:"Final 2 · A Verdade Chegou Atrasada",
 t:["O festival acontece, mas com metade do público. A correção circulou, só que muita gente já tinha se convencido e nunca viu o desmentido.","Você venceu a batalha, mas não a guerra: faltou velocidade, clareza ou transparência."]}}
function draw(){var n=N[S.n],h="";meters();
 document.getElementById("prog").textContent=S.n==="end"?"Fim":"Em andamento";
 if(S.n==="end"){var e=ending();seen[e.k]=1;try{localStorage.setItem("af_end",JSON.stringify(seen))}catch(x){}
  h='<div class="card end '+e.k+'"><div class="badge">'+e.i+'</div><h2>'+e.h+'</h2>'+e.t.map(function(x){return"<p>"+x+"</p>"}).join("")+
  '<div class="tip"><b>Checklist real:</b> 1) Quem publicou? 2) Há data e fonte? 3) Outros veículos confirmam? 4) Busca reversa da imagem/áudio. 5) Na dúvida, não repasse.</div><div class="choices"><button class="again" onclick="start()">Jogar de novo</button></div></div>';
 }else{
  h='<div class="card"><p class="place">'+n.pl+'</p>'+n.t.map(function(x){return"<p>"+x+"</p>"}).join("")+(n.msg?'<div class="msg">'+n.msg+'</div>':"")+(n.tip?'<div class="tip">'+n.tip+'</div>':"")+
  '<div class="choices">'+n.ch.map(function(c,i){return'<button onclick="pick('+i+')">'+c[0]+'</button>'}).join("")+'</div></div>';}
 document.getElementById("stage").innerHTML=h;
 document.getElementById("endings").innerHTML="Finais descobertos: "+[["good","Guardiã"],["mid","Atrasada"],["bad","Viralizou"]].map(function(e){return'<span class="'+(seen[e[0]]?"on":"")+'">'+(seen[e[0]]?e[1]:"???")+'</span>'}).join("");
 window.scrollTo(0,0)}
function showCredits(){document.getElementById("stage").innerHTML='<div class="card credits"><p class="place">Créditos</p><div class="big">3i</div><h2>Alerta Falso</h2><p class="role">Alunos</p><p class="name">Miguel <small>nº 30</small></p><p class="name">Gabriela <small>nº 11</small></p><div class="choices"><button class="again" onclick="draw()">Voltar ao jogo</button></div></div>';window.scrollTo(0,0)}
start();
