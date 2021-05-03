"use strict";
const toplamVaka = document.getElementById("toplam-vaka");
const toplamVefat = document.getElementById("toplam-vefat");
const kritikHasta = document.getElementById("kritik-hasta");
const toplamIyilesen = document.getElementById("toplam-iyilesen");
const toplamTest = document.getElementById("toplam-test");
const toplamAsi = document.getElementById("toplam-asi");
const toplamAsiKisi = document.getElementById("toplam-asi-kisi");
const toplamAsiKisiYuzdesi = document.getElementById("toplam-asi-kisi-yuzdesi");

const gunlukVaka = document.querySelectorAll(".gunluk-vaka");
const gunlukVefat = document.querySelectorAll(".gunluk-vefat");
const gunlukHasta = document.querySelectorAll(".gunluk-hasta");
const gunlukIyilesen = document.querySelectorAll(".gunluk-iyilesen");
const gunlukTest = document.querySelectorAll(".gunluk-test");
const gunlukAsilama = document.querySelectorAll(".gunluk-asilama");

const haftalikVaka = document.querySelectorAll(".haftalik-vaka");
const haftalikVefat = document.querySelectorAll(".haftalik-vefat");
const haftalikIyilesen = document.querySelectorAll(".haftalik-iyilesen");
const haftalikTest = document.querySelectorAll(".haftalik-test");
const haftalikAsilama = document.querySelectorAll(".haftalik-asilama");

const aylikVaka = document.querySelectorAll(".aylik-vaka");
const aylikVefat = document.querySelectorAll(".aylik-vefat");
const aylikIyilesen = document.querySelectorAll(".aylik-iyilesen");
const aylikTest = document.querySelectorAll(".aylik-test");
const aylikAsilama = document.querySelectorAll(".aylik-asilama");

const veriTarihi = document.querySelectorAll(".veri-tarihi");
const nufus = document.getElementById("nufus");
const formatter = new Intl.NumberFormat("en");

const navCont = document.querySelector(".navigation-container");
const icon = document.querySelector(".openc");

function openNav() {
  navCont.classList.toggle("nc-active");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
}

fetch(
  "https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json"
)
  .then((result) => result.json())
  .then((data) => {
    const currentDay = data[Object.keys(data)[Object.keys(data).length - 1]];

    toplamVaka.innerText = formatter.format(currentDay.totalPatients);
    toplamVefat.innerText = formatter.format(currentDay.totalDeaths);
    kritikHasta.innerText = formatter.format(currentDay.critical);
    toplamIyilesen.innerText = formatter.format(currentDay.totalRecovered);
    toplamTest.innerText = formatter.format(currentDay.totalTests);

    gunlukVaka[0].innerText = "+" + formatter.format(currentDay.cases);
    gunlukVaka[1].innerText = "+" + formatter.format(currentDay.cases);

    gunlukVefat[0].innerText = "+" + formatter.format(currentDay.deaths);
    gunlukVefat[1].innerText = "+" + formatter.format(currentDay.deaths);

    gunlukIyilesen[0].innerText = "+" + formatter.format(currentDay.recovered);
    gunlukIyilesen[1].innerText = "+" + formatter.format(currentDay.recovered);

    gunlukTest[0].innerText = "+" + formatter.format(currentDay.tests);
    gunlukTest[1].innerText = "+" + formatter.format(currentDay.tests);

    gunlukHasta[0].innerText = "+" + formatter.format(currentDay.patients);
    gunlukHasta[1].innerText = "+" + formatter.format(currentDay.patients);

    veriTarihi[0].innerHTML =
      '<i class="fas fa-calendar-alt"></i> ' +
      currentDay.date +
      " tarihinde güncellendi.";
    veriTarihi[1].innerHTML =
      '<i class="fas fa-calendar-alt"></i> ' +
      currentDay.date +
      " tarihinde güncellendi.";

    const veri = Object.keys(data).reverse();
    buildTable(veri);
    function buildTable(veri) {
      var table = document.getElementById("archive-table");
      for (let i = 0; i < Object.keys(data).length; i++) {
        var row = `
                <tr>
                <td>${veri[i]}</td>
                <td class="table-vaka">+ ${formatter.format(
                  data[veri[i]].cases
                )}</td>
                <td class="table-vefat">+ ${formatter.format(
                  data[veri[i]].deaths
                )}</td>
                <td class="table-kritik">${formatter.format(
                  data[veri[i]].critical
                )}</td>
                <td class="table-iyilesen">+ ${formatter.format(
                  data[veri[i]].recovered
                )}</td>
                <td class="table-test">+ ${formatter.format(
                  data[veri[i]].tests
                )}</td>
                </tr> `;
        table.innerHTML += row;

        if (i > 258) {
          return;
        }
      }
    }

    buildTable2(veri);
    function buildTable2(veri) {
      var table = document.getElementById("archive-table");
      for (let a = 260; a < Object.keys(data).length; a++) {
        var row = `
                <tr>
                <td>${veri[a]}</td>
                <td class="table-vaka">+ ${formatter.format(
                  data[veri[a]].patients
                )}</td>
                <td class="table-vefat">+ ${formatter.format(
                  data[veri[a]].deaths
                )}</td>
                <td class="table-kritik">${formatter.format(
                  data[veri[a]].critical
                )}</td>
                <td class="table-iyilesen">+ ${formatter.format(
                  data[veri[a]].recovered
                )}</td>
                <td class="table-test">+ ${formatter.format(
                  data[veri[a]].tests
                )}</td>
                </tr> `;
        table.innerHTML += row;
      }
    }
    setTimeout(() => {
      document.querySelector(".loading").style.display = "none";
      document.body.style.overflowY = "scroll";
    }, 500);

    let haftalikVakaDizisi = [];
    let haftalikVefatDizisi = [];
    let haftalikIyilesenDizisi = [];
    let haftalikTestDizisi = [];

    for (let i = 0; i < 7; i++) {
      haftalikVakaDizisi.push(
        parseInt(data[Object.keys(data).reverse()[i]].cases)
      );
      haftalikVefatDizisi.push(
        parseInt(data[Object.keys(data).reverse()[i]].deaths)
      );

      haftalikIyilesenDizisi.push(
        parseInt(data[Object.keys(data).reverse()[i]].recovered)
      );
      haftalikTestDizisi.push(
        parseInt(data[Object.keys(data).reverse()[i]].tests)
      );

      const haftalikVakaSayisi = haftalikVakaDizisi.reduce((a, b) => a + b, 0);
      haftalikVaka[0].innerHTML = formatter.format(haftalikVakaSayisi);
      haftalikVaka[1].innerHTML = formatter.format(haftalikVakaSayisi);

      const haftalikVefatSayisi = haftalikVefatDizisi.reduce(
        (a, b) => a + b,
        0
      );
      haftalikVefat[0].innerHTML = formatter.format(haftalikVefatSayisi);
      haftalikVefat[1].innerHTML = formatter.format(haftalikVefatSayisi);

      const haftalikIyilesenSayisi = haftalikIyilesenDizisi.reduce(
        (a, b) => a + b,
        0
      );
      haftalikIyilesen[0].innerHTML = formatter.format(haftalikIyilesenSayisi);
      haftalikIyilesen[1].innerHTML = formatter.format(haftalikIyilesenSayisi);

      const haftalikTestSayisi = haftalikTestDizisi.reduce((a, b) => a + b, 0);
      haftalikTest[0].innerHTML = formatter.format(haftalikTestSayisi);
      haftalikTest[1].innerHTML = formatter.format(haftalikTestSayisi);
    }

    let aylikVakaDizisi = [];
    let aylikVefatDizisi = [];
    let aylikIyilesenDizisi = [];
    let aylikTestDizisi = [];

    for (let a = 0; a < 30; a++) {
      aylikVakaDizisi.push(
        parseInt(data[Object.keys(data).reverse()[a]].cases)
      );
      aylikVefatDizisi.push(
        parseInt(data[Object.keys(data).reverse()[a]].deaths)
      );

      aylikIyilesenDizisi.push(
        parseInt(data[Object.keys(data).reverse()[a]].recovered)
      );
      aylikTestDizisi.push(
        parseInt(data[Object.keys(data).reverse()[a]].tests)
      );

      const aylikVakaSayisi = aylikVakaDizisi.reduce((a, b) => a + b, 0);
      aylikVaka[0].innerHTML = formatter.format(aylikVakaSayisi);
      aylikVaka[1].innerHTML = formatter.format(aylikVakaSayisi);

      const aylikVefatSayisi = aylikVefatDizisi.reduce((a, b) => a + b, 0);
      aylikVefat[0].innerHTML = formatter.format(aylikVefatSayisi);
      aylikVefat[1].innerHTML = formatter.format(aylikVefatSayisi);

      const aylikIyilesenSayisi = aylikIyilesenDizisi.reduce(
        (a, b) => a + b,
        0
      );
      aylikIyilesen[0].innerHTML = formatter.format(aylikIyilesenSayisi);
      aylikIyilesen[1].innerHTML = formatter.format(aylikIyilesenSayisi);

      const aylikTestSayisi = aylikTestDizisi.reduce((a, b) => a + b, 0);
      aylikTest[0].innerHTML = formatter.format(aylikTestSayisi);
      aylikTest[1].innerHTML = formatter.format(aylikTestSayisi);
    }
  });

fetch(
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
)
  .then((result) => result.json())
  .then((data) => {
    toplamAsi.innerText = formatter.format(data.TUR.total_vaccinations);
    gunlukAsilama[0].innerText =
      "+" + formatter.format(data.TUR.new_vaccinations);
    gunlukAsilama[1].innerText =
      "+" + formatter.format(data.TUR.new_vaccinations);
    toplamAsiKisi.innerText = formatter.format(data.TUR.people_vaccinated);
    toplamAsiKisiYuzdesi.innerText =
      "%" + data.TUR.people_vaccinated_per_hundred;
    nufus.innerHTML =
      '<i class="fas fa-users"></i>' +
      " Nufus: " +
      formatter.format(data.TUR.population);
  });

const dunyaVaka = document.getElementById("dunya-vaka");
const dunyaVefat = document.getElementById("dunya-vefat");
const dunyaIyilesen = document.getElementById("dunya-iyilesen");
const dunyaAsi = document.getElementById("dunya-asi");
const dunyaTests = document.getElementById("dunya-tests");
const dunyaKritik = document.getElementById("dunya-kritik");

fetch("https://cov19.cc/report.json")
  .then((result) => result.json())
  .then((data) => {
    dunyaVaka.innerText = formatter.format(data.regions.world.totals.confirmed);
    dunyaVefat.innerText = formatter.format(data.regions.world.totals.deaths);
    dunyaIyilesen.innerText = formatter.format(
      data.regions.world.totals.recovered
    );
    dunyaAsi.innerText = formatter.format(data.regions.world.totals.vaccinated);
    dunyaTests.innerText = formatter.format(data.regions.world.totals.tests);
    dunyaKritik.innerText = formatter.format(
      data.regions.world.totals.critical
    );
  });
const toolTip = document.querySelector(".tooltip");
const sehirText = document.querySelector(".sehir");
const riskText = document.querySelector(".risk");

const paths = document.getElementsByTagName("path");

window.addEventListener("mousemove", function (e) {
  const y = e.clientX - toolTip.offsetWidth;
  const x = e.clientY - toolTip.offsetHeight;

  toolTip.style.top = x + "px";
  toolTip.style.left = y + "px";

  let sehirIsmi = e.target.getAttribute("title");
  let sehirRiski = e.target.getAttribute("data-durum");
  sehirText.innerText = sehirIsmi;
  riskText.innerText = sehirRiski;

  if (sehirRiski === "Çok Yüksek Risk") {
    riskText.style.color = "#df1a23";
  }
  if (sehirRiski === "Yüksek Risk") {
    riskText.style.color = "#f8931f";
  }
  if (sehirRiski === "Orta Risk") {
    riskText.style.color = "#f0e513";
  }
  if (sehirRiski === "Düşük Risk") {
    riskText.style.color = "#0071c1";
  }

  if (e.target.tagName != "path") {
    toolTip.style.display = "none";
  } else {
    toolTip.style.display = "block";
  }
});

for (let i = 0; i < paths.length; i++) {
  const sehirRiskDurumu = paths[i].getAttribute("data-durum");
  if (sehirRiskDurumu === "Çok Yüksek Risk") {
    paths[i].style.fill = "#df1a23";
  }
  if (sehirRiskDurumu === "Yüksek Risk") {
    paths[i].style.fill = "#f8931f";
  }
  if (sehirRiskDurumu === "Orta Risk") {
    paths[i].style.fill = "#f0e513";
  }
  if (sehirRiskDurumu === "Düşük Risk") {
    paths[i].style.fill = "#0071c1";
  }
}

const riskYuzdesi = document.querySelector(".risk-yy-1");

riskYuzdesi.innerText = "%" + Math.floor((79 * 100) / 81);

const newsContainer = document.querySelector(".news-cont");

fetch(
  "http://api.mediastack.com/v1/news?access_key=48ef59dabaa7b9be60d0f1d388a0b35a&countries=tr&sort=published_desc&keywords=korona"
)
  .then((result) => result.json())
  .then((respond) => {
    for (let i = 0; i < respond.data.length; i++) {
      newsContainer.innerHTML +=
        "<a target='_blank' href=" +
        respond.data[i].url +
        ">" +
        '<div class="content-cont">' +
        '<img src="' +
        respond.data[i].image.split(" ")[0] +
        '" class="news-img">' +
        '<h1 class="news-header">' +
        respond.data[i].title +
        "</h1>" +
        '<p class="news-description">' +
        respond.data[i].description +
        "</p>";
      +"</div>" + "</a>";
    }
  });
