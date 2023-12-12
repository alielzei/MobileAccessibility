//JavaScript function to generate the final priorities chart
function createChart(priorityPercents, ctx){
    var data = {
        labels: ['Priority 1', 'Priority 2', 'Priority 3'],
        datasets: [{
            data: [priorityPercents.P1, priorityPercents.P2, priorityPercents.P3],
            backgroundColor: ['#FFB3C6', '#FF8FAB', '#FB6F92'],
        }]
    };   
    
    new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.data[context.dataIndex] + '%';
                        }
                    }
                }
            }
            //maintainAspectRatio: false,
        }
    });
}