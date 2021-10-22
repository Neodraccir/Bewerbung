function buildText(texts) {
  let content = [
    {
      type: "title",
      element: document.querySelector("#container > main > header > h1"),
      text: texts.title,
    },
    {
      type: "subtitle",
      element: document.querySelector("#container > main > header > h2"),
      text: texts.name,
    },
    {
      type: "name",
      element: document.querySelector(
        "#container > main > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      ),
      text: texts.name,
    },
    {
      type: "birthday",
      element: document.querySelector(
        "#container > main > table > tbody > tr:nth-child(3) > td:nth-child(2)"
      ),
      text: texts.birthday,
    },
    {
      type: "skills",
      element: document.querySelector(
        "#container > main > table > tbody > tr:nth-child(4) > td:nth-child(2)"
      ),
      text: texts.skills,
    },
    {
      type: "exp",
      element: document.querySelector(
        "#container > main > table > tbody > tr:nth-child(5) > td:nth-child(2)"
      ),
      text: texts.exp,
    },
    {
      type: "timeline",
      element: document.querySelector("#container > main > ul.timeline"),
      text: texts.timeline,
    },
    {
      type: "QandA",
      element: document.querySelector("#QandA"),
      text: texts.QandA,
    },
  ];

  content.forEach((i) => {
    let changeContent = (newContent, differentElement) => {
      let element = differentElement ? differentElement : i.element;
      element.innerHTML = newContent;
    };

    if (i.type == "title") i.element.innerHTML = i.text;
    if (i.type == "subtitle") changeContent(`${i.text[0]} ${i.text[1]}`);
    if (i.type == "name") changeContent(`${i.text[0]}<br />${i.text[1]}`);
    if (i.type == "birthday") {
      let years = new Date();
      years = Number(years.getFullYear()) - Number(i.text.slice(6, 10));
      changeContent(`${years} Jahre`);
    }
    if (i.type == "skills") {
      let text = "";
      for (let u = 0; u < i.text.length; u++) {
        text += `${i.text[u]}`;
        if (u + 1 < i.text.length) text += "<br />";
      }
      changeContent(text);
    }
    if (i.type == "exp") changeContent(`${i.text[0]}<br />${i.text[1]}`);
    if (i.type == "timeline") {
      let times = i.element.children;
      for(let u = 0; u<times.length; u++){
          let flag = times[u].querySelector(".flag"),
          time = times[u].querySelector(".time"),
          desc = times[u].querySelector(".desc");
          
        changeContent(i.text[u].title, flag)
        changeContent(i.text[u].time, time)
        changeContent(i.text[u].text, desc)

      }
    }
    if(i.type == "QandA"){
        i.text.forEach((entry)=>{
            if(entry[0] != ""){
                let h3 = document.createElement("h3");
                h3.innerHTML = entry[0]
                i.element.appendChild(h3)
            } 
            if(entry[1] != ""){
                let p = document.createElement("p");
                p.innerHTML = entry[1]
                i.element.appendChild(p)
            } 
        })
    }
  });
}

export { buildText };
