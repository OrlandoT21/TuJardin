function createLeaf() {
    const leaf = document.createElement('div');
    leaf.textContent = '🍂';
    leaf.classList.add('leaf');
    document.body.appendChild(leaf);

    leaf.style.left = Math.random() * window.innerWidth + 'px';
    leaf.style.top = -20 + 'px'; // Start from above

    setTimeout(() => {
        leaf.remove();
    }, 6000);
}

function sprinkleFairyDust() {
    const numberOfLeaves = 3;
    for (let i = 0; i < numberOfLeaves; i++) {
        createLeaf();
    }
}

setInterval(sprinkleFairyDust, 500);

function createLeafy() {
    const leaf = document.createElement('div');
    leaf.textContent = '🍃';
    leaf.classList.add('leafy');
    document.body.appendChild(leaf);

    leaf.style.left = Math.random() * window.innerWidth + 'px';
    leaf.style.top = -20 + 'px'; // Start from above

    setTimeout(() => {
        leaf.remove();
    }, 6000);
}

function FallingLeaves() {
    const numberOfLeaves = 2;
    for (let i = 0; i < numberOfLeaves; i++) {
        createLeafy();
    }
}

setInterval(FallingLeaves, 500);
// End of Falling leaves

document.addEventListener("DOMContentLoaded", function() {
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", function() {
            window.location.href = "index.html";
        });
    }

    const solutionContainer = document.getElementById("solution-container");
    const solutionText = document.getElementById("solution-text");
    const problemButtonContainer = document.getElementById("problem-button-container");
    const problemTitleDisplay = document.getElementById("problem-title"); // Get the new span

    // Definición de soluciones a los problemas comunes
    const solutions = {
        "Hojas amarillas": "El amarillamiento (clorosis) puede deberse a varios problemas. Verifica tus hábitos de riego primero: El riego excesivo sofoca las raíces, mientras que la falta de riego provoca deshidratación. Asegúrate de que tu maceta tenga orificios de drenaje. Luego, considera los nutrientes: El amarillamiento de las hojas más viejas puede indicar una deficiencia de nitrógeno (a menudo con una apariencia pálida general), mientras que el amarillamiento entre las venas de las hojas más jóvenes podría sugerir una deficiencia de hierro o magnesio (especialmente en suelos alcalinos). Utiliza un fertilizante líquido equilibrado diluido a la mitad de su fuerza cada 2-4 semanas durante la temporada de crecimiento, o un fertilizante de liberación lenta según las instrucciones del paquete. Considera los niveles de luz: Demasiada poca luz también puede causar hojas pálidas o amarillentas. Finalmente, verifica si hay plagas o enfermedades que puedan interrumpir la absorción de nutrientes.",
        "Manchas en las hojas": "Las manchas en las hojas pueden ser fúngicas, bacterianas o debidas a factores ambientales. Las manchas fúngicas a menudo aparecen circulares con anillos concéntricos o bordes oscuros, prosperando en condiciones húmedas. Mejora la circulación del aire, evita mojar las hojas al regar y considera un fungicida si el problema persiste. Las manchas bacterianas tienden a ser irregulares, empapadas en agua y pueden tener un halo amarillo. Retira las hojas afectadas y evita el riego por encima. Las quemaduras solares resultan en parches blanqueados o marrones y secos en áreas expuestas a la luz solar directa intensa; reubica la planta a un lugar más sombreado. Las deficiencias de nutrientes también pueden manifestarse como manchas; un fertilizante equilibrado podría ayudar.",
        "Hojas marchitas": "El marchitamiento puede ser un signo de falta de riego (la tierra estará seca al tacto), riego excesivo (las raíces pueden estar pudriéndose, la tierra se siente empapada), daño en las raíces (por plagas, shock de trasplante o lesiones físicas) o enfermedades vasculares que bloquean el transporte de agua. Verifica la humedad del suelo primero. Si está seco, riega a fondo. Si está húmedo, deja que la tierra se seque e inspecciona las raíces si el problema continúa. Asegura un drenaje adecuado. Protege de temperaturas extremas y cambios ambientales repentinos.",
        "Puntas de las hojas marrones": "Las puntas marrones en las hojas a menudo son causadas por baja humedad, riego inconsistente o una acumulación de sales del agua del grifo o fertilizantes. Utiliza agua destilada o de lluvia si es posible. Aumenta la humedad usando un humidificador, una bandeja con guijarros o agrupando plantas. Asegura un riego constante, permitiendo que la capa superior de la tierra se seque ligeramente entre riegos. Ocasionalmente, enjuaga la maceta con agua para eliminar el exceso de sales.",
        "Crecimiento alargado y débil": "Este 'etiolamiento' es una clara señal de luz insuficiente. Las plantas se estiran hacia cualquier fuente de luz disponible, lo que resulta en tallos largos y débiles y hojas pálidas. Mueve gradualmente la planta a un lugar con luz indirecta más brillante o complementa con una luz de crecimiento. Poda el crecimiento alargado para fomentar un desarrollo más tupido una vez que se proporcione la luz adecuada.",
        "Polvo blanco en las hojas y tallos": "Esto probablemente sea mildiu polvoriento, una enfermedad fúngica favorecida por la alta humedad y la mala circulación del aire. Mejora la ventilación espaciando las plantas y utilizando un pequeño ventilador. Evita mojar las hojas al regar. Retira las hojas muy afectadas. Puedes tratar con un fungicida específico para el mildiu polvoriento o probar un remedio casero de 1 cucharadita de bicarbonato de sodio y unas gotas de jabón para platos en 1 litro de agua, rociando las áreas afectadas (prueba primero en un área pequeña).",
        "Áfidos": "Los áfidos son pequeños insectos chupadores de savia que se agrupan en los brotes nuevos. Pueden causar la deformación de las hojas y dejar una melaza pegajosa. Elimínalos con un chorro fuerte de agua. Introduce depredadores naturales como mariquitas o crisopas. Para infestaciones más graves, utiliza jabón insecticida, aceite de neem o insecticidas a base de piretrina, siguiendo cuidadosamente las instrucciones del producto.",
        "Moscas/mosquitos": "Las pequeñas moscas que zumban alrededor de la tierra probablemente sean moscas del sustrato. Sus larvas se alimentan de materia orgánica en suelos constantemente húmedos. Deja que la capa superior de la tierra se seque entre riegos. Mejora el drenaje. Puedes usar trampas pegajosas amarillas para atrapar a los adultos y un riego con Bacillus thuringiensis israelensis (Bti) para matar las larvas en la tierra.",
        "Raíces blandas y marrones": "La pudrición de la raíz generalmente es causada por el riego excesivo y el mal drenaje, lo que lleva a la falta de oxígeno alrededor de las raíces. Retira la planta de la maceta e inspecciona cuidadosamente las raíces. Corta cualquier raíz blanda, marrón o negra con tijeras de podar esterilizadas. Trasplanta a una mezcla para macetas fresca y con buen drenaje en una maceta con orificios de drenaje. Reduce la frecuencia de riego y asegúrate de que la maceta no esté en agua estancada.",
        "Crecimiento lento": "El crecimiento lento puede deberse a varios factores. Evalúa los niveles de luz, agua y nutrientes para asegurarte de que satisfacen las necesidades específicas de la planta. Verifica si la planta está atada de raíz (raíces que circulan dentro de la maceta), en cuyo caso necesita ser trasplantada a un recipiente ligeramente más grande con tierra fresca. Asegúrate de que la temperatura esté dentro del rango preferido de la planta. Una fertilización suave y equilibrada durante la temporada de crecimiento también puede ayudar.",
        "Hojas rizadas": "Las hojas que se rizan pueden indicar estrés hídrico (demasiada o muy poca agua), infestación de plagas (áfidos, arañas rojas, trips pueden causar distorsión), estrés ambiental (temperaturas extremas, corrientes de aire) o incluso daño por herbicidas si se han utilizado cerca. Verifica la humedad del suelo e inspecciona si hay plagas en la parte inferior de las hojas. Asegura un ambiente estable y evita cambios repentinos. En algunos casos, la deficiencia de calcio puede hacer que las hojas jóvenes se ricen y se pongan pálidas; considera un suplemento de calcio si se descartan otros problemas.",
        "Sustancia pegajosa en las hojas": "Esta sustancia pegajosa, conocida como melaza, es excretada por insectos chupadores de savia como áfidos, escamas, cochinillas o moscas blancas. Inspecciona cuidadosamente la parte inferior de las hojas y los tallos en busca de estas plagas. Limpia la melaza con un paño húmedo. Trata la infestación de plagas subyacente con jabón insecticida, aceite de neem o aceite hortícola, asegurándote de cubrir bien todas las partes de la planta.",
        "Falta de floración": "¡La falta de flores puede ser frustrante! Asegúrate de que tu planta reciba la cantidad correcta de luz para su especie (muchas necesitan luz brillante para florecer). Utiliza un fertilizante más rico en fósforo (el número central en la proporción N-P-K) unas semanas antes del período de floración esperado. Algunas plantas requieren un período de letargo con temperaturas más frías y riego reducido para desencadenar la floración. Además, asegúrate de que la planta no esté dedicando toda su energía a un crecimiento vegetativo excesivo debido a demasiado nitrógeno.",
        "Venas de las hojas amarillas": "El amarillamiento entre las venas (clorosis intervenal) a menudo apunta a una deficiencia de micronutrientes, más comúnmente hierro o manganeso, especialmente en suelos alcalinos (un pH alto puede impedir la absorción). Puedes probar con un suplemento de hierro quelado o ajustar el pH del suelo si es demasiado alto (aunque esto puede ser complicado). La deficiencia de magnesio también puede causar amarillamiento intervenal, particularmente en las hojas más viejas; las sales de Epsom (sulfato de magnesio) pueden usarse como una solución temporal, pero aborda las condiciones subyacentes del suelo.",
        "Agujeros en las hojas": "Los agujeros en las hojas suelen ser obra de plagas masticadoras como orugas, babosas, caracoles o escarabajos. Inspecciona la planta a fondo, especialmente la parte inferior de las hojas, en busca de los culpables. Recoge a mano cualquier plaga visible. Para babosas y caracoles, puedes usar trampas de cerveza o tierra de diatomeas. Para orugas y escarabajos, el Bacillus thuringiensis (Bt) es un control biológico eficaz. Considera barreras físicas como redes para plantas vulnerables.",
        "Bordes de las hojas quemados": "Los bordes de las hojas quemados o chamuscados pueden ser causados por exceso de fertilización (acumulación de sales en el suelo), agua del grifo dura con alto contenido de minerales o fluoruro, o exposición repentina a la luz solar directa intensa después de estar a la sombra. Enjuaga bien la tierra con agua para eliminar el exceso de sales. Utiliza agua de lluvia o destilada si el agua del grifo es problemática. Aclimata gradualmente las plantas a condiciones de luz más brillantes.",
        "Caída repentina de hojas": "La caída repentina de hojas a menudo es un signo de estrés debido a cambios bruscos en las condiciones ambientales, como temperatura, luz o riego. También puede ocurrir después del trasplante. Evita los cambios repentinos y trata de mantener condiciones consistentes. Las corrientes de aire frío o el aire muy seco (especialmente en invierno con calefacción) también pueden provocar la caída de hojas.",
        "Hojas pálidas o sin color": "Las hojas generalmente pálidas o descoloridas a menudo indican una falta de luz suficiente o una deficiencia general de nutrientes, particularmente nitrógeno. Mueve la planta a un lugar más brillante (luz indirecta para la mayoría de las plantas de interior) y considera alimentarla con un fertilizante equilibrado.",
        "Flores que se marchitan rápidamente": "Las flores que se marchitan rápidamente pueden deberse a falta de agua, temperaturas altas, baja humedad o simplemente al final natural del ciclo de vida de la flor. Asegúrate de que la planta esté bien regada, especialmente cuando está floreciendo. Mantenla alejada de fuentes de calor directo. Aumenta la humedad si el aire es muy seco. Despunta (retira las flores marchitas) para fomentar la producción de más flores.",
        "Telarañas finas en las hojas": "Estas delicadas telarañas son una señal reveladora de arañas rojas, pequeñas plagas chupadoras de savia que prosperan en condiciones secas. Causan un punteado amarillo en las hojas. Aumenta la humedad rociando o usando un humidificador. Limpia las hojas para eliminar los ácaros. Para infestaciones significativas, utiliza jabón insecticida, aceite de neem o un acaricida específico, asegurándote de rociar todas las partes de la planta, especialmente la parte inferior de las hojas, y repite las aplicaciones según sea necesario.",
        "Bultos anormales en hojas o tallos": "Los crecimientos anormales o agallas pueden ser causados por insectos, ácaros, hongos o bacterias. Aísla la planta afectada para evitar una posible propagación. Retira y destruye las partes muy afectadas. Identificar la causa específica es crucial para el tratamiento, que puede implicar poda, jabón insecticida, aceite de neem o un fungicida o bactericida sistémico.",
        "Base del tallo blanda o ennegrecida": "Una base del tallo blanda, pastosa o ennegrecida es un signo grave de pudrición del tallo, a menudo causada por riego excesivo y mal drenaje, lo que lleva a infecciones fúngicas o bacterianas. Mejora la ventilación alrededor de la base de la planta y reduce el riego. Asegúrate de que la base del tallo no esté enterrada demasiado profundamente en la tierra. En casos avanzados, puede ser difícil salvar la planta, pero puedes intentar propagar secciones sanas si están disponibles.",
        "Cristales blancos en el sustrato": "Estos depósitos blancos suelen ser acumulaciones de sales minerales del agua del grifo o los fertilizantes. Si bien no son inmediatamente dañinos en pequeñas cantidades, una acumulación excesiva puede afectar la absorción de nutrientes. Riega a fondo desde la parte superior hasta que el agua drene por la parte inferior para ayudar a lixiviar estas sales. Utiliza agua de lluvia o destilada si el agua del grifo es muy dura. Reduce la frecuencia y la concentración de los fertilizantes.",
        "Hojas jóvenes muy pequeñas": "Las hojas nuevas significativamente más pequeñas de lo normal pueden indicar luz insuficiente, falta de nutrientes (especialmente nitrógeno) o que la planta está atada de raíz y necesita ser trasplantada a una maceta más grande para permitir un mayor crecimiento de las raíces y la absorción de nutrientes.",
        "Hojas deformadas o retorcidas": "Las hojas deformadas o retorcidas pueden ser causadas por plagas chupadoras de savia (áfidos, trips, arañas rojas), daño por herbicidas (incluso por deriva) o, a veces, problemas fisiológicos relacionados con un crecimiento rápido en condiciones ambientales inconsistentes. Inspecciona cuidadosamente en busca de plagas. Asegúrate de no haber utilizado herbicidas cerca. Proporciona luz, temperatura y humedad estables.",
        "Barrenadores (túneles en hojas)": "Los minadores de hojas son larvas de varios insectos que hacen túneles dentro de las hojas, dejando rastros visibles. Retira y destruye las hojas afectadas. Puedes intentar aplastar suavemente las larvas dentro de los túneles si son accesibles. Para medidas preventivas o infestaciones graves, considera el uso de insecticidas sistémicos, aplicándolos según la etiqueta del producto. Fomenta la presencia de enemigos naturales como las avispas parásitas.",
        "Olor desagradable en el sustrato": "Un olor desagradable, a humedad o a podrido que proviene de la tierra es un fuerte indicador de riego excesivo y probablemente la presencia de bacterias anaeróbicas u hongos. Deja que la tierra se seque considerablemente antes de volver a regar. Asegúrate de que la maceta tenga un drenaje adecuado. Considera trasplantar con tierra fresca y con buen drenaje."
    };


    // Create and append buttons for each problem
    let currentRow = document.createElement('div'); // Initialize the first row
    currentRow.style.display = 'flex';
    currentRow.style.flexWrap = 'wrap'; // Enable wrapping
    currentRow.style.gap = '10px';
    currentRow.style.marginBottom = '15px';
    problemButtonContainer.appendChild(currentRow);

    const buttons = {}; // To keep track of the created buttons

    for (const issueKey in solutions) {
        const button = document.createElement('button');
        button.textContent = issueKey; // Use the problem title as the button text
        button.classList.add('select-issue');
        button.setAttribute('data-issue', issueKey); // Set the data-issue to the problem title (key)
        currentRow.appendChild(button);
        buttons[issueKey] = button; // Store the button for later use
    }

    // Event listener for the dynamically created buttons
    problemButtonContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('select-issue')) {
            // Reset the color of the previously selected button
            const previouslySelected = problemButtonContainer.querySelector('.selected');
            if (previouslySelected) {
                previouslySelected.classList.remove('selected');
                previouslySelected.style.backgroundColor = '#7d9942'; // Revert to the original color
            }

            const issueKey = event.target.getAttribute("data-issue");
            solutionText.textContent = solutions[issueKey] || "No hay información disponible.";
            problemTitleDisplay.textContent = issueKey; // Set the problem title
            solutionContainer.style.display = "block";

            // Change the color of the currently selected button
            event.target.classList.add('selected');
            event.target.style.backgroundColor = '#566b28'; // Darker green
        }
    });
});