let course ;
let program;

function loadData(){
    fetch ('https://studenter.miun.se/~mallar/dt211g/')
    .then(response => response.json() )
    .then( data => {
            filterData2(data);
            convertData();
            sortData();
            filterTop();
            createChart();
            createPie();
            console.log(program, course)
    })
}
function filterData2 (data){
    course = data.filter(
        (item) => {
         return item.type== 'Kurs';
        }
     )
     program = data.filter(
         (item) => {
          return item.type== 'Program';
         }
      )
}

function convertData(){
    course = course.map(
        (item) => {
            return (
                {
                    type: item.type,
                    name: item.name,
                    admissionRound: item.admissionRound,
                    applicantsFirstHand: item.applicantsFirstHand,
                    applicantsTotal: Number(item.applicantsTotal)
                }
            )
        }
    )
    program = program.map(
        (item) => {
            return (
                {
                    type: item.type,
                    name: item.name,
                    admissionRound: item.admissionRound,
                    applicantsFirstHand: item.applicantsFirstHand,
                    applicantsTotal: Number(item.applicantsTotal)
                }
            )
        }
    )
}

function sortData(){
    course = course.sort(
        (a,b)=> {
            return b.applicantsTotal - a.applicantsTotal;
        }
    )

    program = program.sort(
        (a,b)=> {
            return b.applicantsTotal - a.applicantsTotal;
        }
    )
}
function filterTop(){
    course = course.slice(0,6);
    program = program.slice(0,5)
}
function createChart(){

  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: course.map(item => item.name),
      datasets: [{
        label: 'Mest sökta kurser',
        data: course.map(item => item.applicantsTotal),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
function createPie(){

    const ctx = document.getElementById('myPie');
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: program.map(item => item.name),
        datasets: [{
          label: 'Mest sökta program',
          data: program.map(item => item.applicantsTotal),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
  }
  
