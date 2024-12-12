CREATE TABLE concluidos (
  id int NOT NULL AUTO_INCREMENT,
  id_usuario int NOT NULL,
  sub_id int NOT NULL,
  PRIMARY KEY (id),
  KEY id_usuario (id_usuario),
  KEY sub_id (sub_id),
  CONSTRAINT concluidos_ibfk_1 FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
  CONSTRAINT concluidos_ibfk_2 FOREIGN KEY (sub_id) REFERENCES subtopicos (id)
);

--
-- Table structure for table conteudos
--
DROP TABLE IF EXISTS concluidos;
DROP TABLE IF EXISTS conteudos;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE conteudos (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  descricao text,
  PRIMARY KEY (id)
);

--
-- Table structure for table favoritos
--

DROP TABLE IF EXISTS favoritos;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE favoritos (
  id int NOT NULL AUTO_INCREMENT,
  id_usuario int NOT NULL,
  sub_id int NOT NULL,
  PRIMARY KEY (id),
  KEY id_usuario (id_usuario),
  KEY sub_id (sub_id),
  CONSTRAINT favoritos_ibfk_1 FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
  CONSTRAINT favoritos_ibfk_2 FOREIGN KEY (sub_id) REFERENCES subtopicos (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table subtopicos
--

DROP TABLE IF EXISTS subtopicos;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE subtopicos (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  texto_teoria text,
  video_aulas text,
  questoes text,
  gabaritos text,
  cont_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY cont_id (cont_id),
  CONSTRAINT subtopicos_ibfk_1 FOREIGN KEY (cont_id) REFERENCES conteudos (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table usuarios
--

DROP TABLE IF EXISTS usuarios;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE usuarios (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  email varchar(30) NOT NULL,
  senha varchar(15) NOT NULL,
  dt_nascimento date DEFAULT NULL,
  ocupacao varchar(50) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO conteudos (nome, descricao) VALUES ('Razão e Proporção', 'Conteúdo sobre razões matemáticas, proporções, regra de três simples e compostas, com aplicações práticas em problemas do dia a dia.')

INSERT INTO subtopicos (nome, texto_teoria, video_aulas, questoes, gabaritos, cont_id) VALUES
('Razão e Proporção', 
'<p>A razão entre dois números é a operação de divisão do primeiro pelo seguinte. O primeiro termo é chamado de <strong>antecedente</strong>, e o segundo, de <strong>consequente</strong>.</p>
<p><strong>Propriedades importantes:</strong></p>
<ul>
    <li>Para toda razão <code>a/b</code>, <code>a</code> é o antecedente e <code>b</code> é o consequente.</li>
    <li>Quando dividimos uma razão <code>a/b</code> por um número inteiro <code>n</code>, multiplicamos <code>b</code> por <code>n</code>.</li>
    <li>A razão de duas grandezas na mesma medida é o quociente de divisão dos números que as representam.</li>
</ul>', 
'https://www.youtube.com/watch?v=exemplo1
https://www.youtube.com/watch?v=exemplo2
https://www.youtube.com/watch?v=exemplo3', 
'<ol>
    <li>
        Em uma escola há 55 funcionários, sendo 35 professores e 20 funcionários administrativos. Determine a razão entre:
        <ul>
            <li>a) o número de professores e o total de funcionários</li>
            <li>b) o número de funcionários administrativos e o total de funcionários</li>
        </ul>
    </li>
    <li>
        João tem uma moto que faz <strong>240km</strong> com <strong>20 litros</strong> de gasolina. Quantos quilômetros a moto percorrerá com <strong>35 litros</strong>, mantendo o mesmo consumo?
    </li>
</ol>', 
'<div>
    <h3>Resolução Questão 1:</h3>
    <p><strong>a)</strong> A razão entre o número de professores e o total de funcionários:</p>
    <p>
        <math>
            <mfrac>
                <mn>35</mn>
                <mn>55</mn>
            </mfrac>
            = 
            <math>
                <mfrac>
                    <mn>7</mn>
                    <mn>11</mn>
                </mfrac>
            </math>
        </math>
    </p>
    <p><strong>b)</strong> A razão entre o número de funcionários administrativos e o total de funcionários:</p>
    <p>
        <math>
            <mfrac>
                <mn>20</mn>
                <mn>55</mn>
            </mfrac>
            = 
            <math>
                <mfrac>
                    <mn>4</mn>
                    <mn>11</mn>
                </mfrac>
            </math>
        </math>
    </p>

    <h3>Resolução Questão 2:</h3>
    <p>Usando regra de três:</p>
    <p>
        <strong>20L</strong> --- <strong>240km</strong><br>
        <strong>35L</strong> --- <strong>x</strong>
    </p>
    <p>Calculando:</p>
    <p>
        <math>
            <mi>x</mi>
            =
            <mfrac>
                <mrow>
                    <mn>35</mn>
                    <mo>&times;</mo>
                    <mn>240</mn>
                </mrow>
                <mn>20</mn>
            </mfrac>
            =
            <mn>420</mn>
            <mo>km</mo>
        </math>
    </p>
</div>', 
1),

('Regra de Três simples',
 '<p>A regra de três simples é um método matemático usado para resolver problemas envolvendo duas grandezas diretamente proporcionais ou inversamente proporcionais. Ela permite encontrar um valor desconhecido a partir de outros três valores conhecidos.

</p>
<p><strong>Quando usar a regra de três simples?</strong></p>
<ul>
    <li>Grandezas diretamente proporcionais: Quando uma grandeza aumenta, a outra também aumenta na mesma proporção.
Exemplo: Quanto maior o número de produtos comprados, maior será o custo total</li>
    <li>Grandezas inversamente proporcionais: Quando uma grandeza aumenta, a outra diminui na mesma proporção.
Exemplo: Quanto maior o número de pessoas para realizar uma tarefa, menor será o tempo necessário para concluí-la.</li>
   
</ul>', 
'https://youtu.be/ItyrkYirrqw?si=TrfDyWPtnNHA72S7
https://youtu.be/7gK3-QG363o?si=aWI70jPL88LJeyZi
https://youtu.be/G5KU1-EZLMY?si=2ynB65Mu0etSWczn', 
'<ol>
    <li>
        Em uma escola há 55 funcionários, sendo 35 professores e 20 funcionários administrativos. Determine a razão entre:
        <ul>
            <li>a) o número de professores e o total de funcionários</li>
            <li>b) o número de funcionários administrativos e o total de funcionários</li>
        </ul>
    </li>
    <li>
        João tem uma moto que faz <strong>240km</strong> com <strong>20 litros</strong> de gasolina. Quantos quilômetros a moto percorrerá com <strong>35 litros</strong>, mantendo o mesmo consumo?
    </li>
</ol>', 
'<div>
    <h3>Resolução Questão 1:</h3>
    <p><strong>a)</strong> A razão entre o número de professores e o total de funcionários:</p>
    <p>
        <math>
            <mfrac>
                <mn>35</mn>
                <mn>55</mn>
            </mfrac>
            = 
            <math>
                <mfrac>
                    <mn>7</mn>
                    <mn>11</mn>
                </mfrac>
            </math>
        </math>
    </p>
    <p><strong>b)</strong> A razão entre o número de funcionários administrativos e o total de funcionários:</p>
    <p>
        <math>
            <mfrac>
                <mn>20</mn>
                <mn>55</mn>
            </mfrac>
            = 
            <math>
                <mfrac>
                    <mn>4</mn>
                    <mn>11</mn>
                </mfrac>
            </math>
        </math>
    </p>

    <h3>Resolução Questão 2:</h3>
    <p>Usando regra de três:</p>
    <p>
        <strong>20L</strong> --- <strong>240km</strong><br>
        <strong>35L</strong> --- <strong>x</strong>
    </p>
    <p>Calculando:</p>
    <p>
        <math>
            <mi>x</mi>
            =
            <mfrac>
                <mrow>
                    <mn>35</mn>
                    <mo>&times;</mo>
                    <mn>240</mn>
                </mrow>
                <mn>20</mn>
            </mfrac>
            =
            <mn>420</mn>
            <mo>km</mo>
        </math>
    </p>
</div>', 
1),

('Regra de Três Composta', 
'<p>A regra de três composta é utilizada quando temos três ou mais grandezas envolvidas na resolução de um problema.</p>', 
'https://www.youtube.com/watch?v=exemplo6
https://www.youtube.com/watch?v=exemplo7', 
'<ol>
    <li>
        Se 8 máquinas, trabalhando 6 horas por dia, durante 15 dias, produzem 720 peças, quantas peças serão produzidas por 10 máquinas, trabalhando 8 horas por dia, durante 12 dias?
    </li>
</ol>', 
'<div>
    <h3>Resolução:</h3>
    <p>Montando a proporção e analisando as relações:</p>
    <p>8 máquinas --- 10 máquinas (diretamente)<br>6h --- 8h (diretamente)<br>15 dias --- 12 dias (diretamente)<br>720 peças --- x peças</p>
    <p>x = (720 * 10 * 8 * 12)/(8 * 6 * 15) = 960 peças</p>
</div>', 
1);





