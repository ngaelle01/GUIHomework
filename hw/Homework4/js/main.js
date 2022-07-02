function showData() {
    let margin ={top: 10, right: 20, bottom: 40, left: 60}
    d3.json("./rsc/finance.json").then(data=>{
        let svg = d3.select("#fetch").append('svg')
        let pxX = 600 - margin.left - margin.right,
            pxY = 300 - margin.top - margin.bottom
        svg = svg.attr('width', 600 + margin.left + margin.right).attr('height',
            300 + margin.top + margin.bottom)
            .style('background', 'lightgrey')
            .append('g')
            .attr('transform', `translate(${margin.left} ${margin.top + 30}`)

        // get values
        let {result} = data.chart
        let {timestamp, comparisons} = result[0]
        let date = []
        timestamp.forEach(data=> {
            date.push(new Date(data*1000))
        })


        // set scaling for time
        let scX = d3.scaleTime().domain([date[0], date[date.length - 1]]).range([0, pxX]) // your x scaling value generator

            // get min and max values
            let [minVal, maxVal] = [Infinity, -Infinity]
        comparisons.forEach(tick=>{
            // get the high and min value for all values
            let {high} = tick
            let [currMin, currMax] = d3.extent(high)
            if (currMin < minVal) minVal = currMin
            if (currMax > maxVal) maxVal = currMax
        })
        let scY = d3.scaleLinear().domain([minVal, maxVal]).range([pxY, 0]).nice()// your y scaling value generator

            let color = ['red', 'blue', 'yellow', 'green']

        // generating circles for each value in high
        comparisons.forEach((tick, idx)=>{
            let {high,symbol} = tick
            let g = svg.append("g")
            g.selectAll('circle')
                .data(high)
                .enter()
                .append("circle")
                .attr('r', 3)
                .attr('fill', color[idx])
                .attr('cx', (d, i)=>scX(date[i]))
                .attr('cy', d=>{

                    return scY(d)})

            let makeLine = d3.line()
                .x((d, i)=>scX(date[i]))
                .y(d=>scY(d))
                g.append('path')
                    .attr('d', makeLine(high))
                    .attr('fill', 'none')
                    .attr('stroke', color[idx])

            let text = svg.append("text")
            g.selectAll('circle')
                .on('mouseover', function(e, d){
                    let [x, y] = d3.pointer(e, this)
                    // make the text visible and display value
                    // hover over existing circle objects, display the y value aka high
                    text.attr('visibility', 'visible')
                        .attr('pointer-events', 'none')
                        .attr('x', x + 10)
                        .attr('y', y + 40)
                        .text(`${d}`)
                })
                .on('mouseleave', function(){
                    text.attr('visibility', 'hidden')
                })

            // adding legends
            g.append('text')
                .attr('x', pxX + 20)
                .attr('y', d=>200 - idx * 20)
                .attr("fill", color[idx])
                .text(symbol)
        })
        // adding ticks and axis
        let axis = d3.axisRight(scY)
        svg.append('g').call(axis)
        axis = d3.axisTop(scX)
        svg.append('g')
            .attr('transform', `translate(0, ${pxY + 10})`)
            .call(axis)
            .selectAll('text')
            .attr('transform', 'rotate(90)translate(20, 0)')


        const xAxisGrid = d3.axisBottom(scX).tickSize(-pxX+270).tickFormat('').ticks(10);
        svg.append('g')
            .attr('class','x, axis-grid')
            .attr('transform', `translate(0, ${pxY})`).call(xAxisGrid)

        const yAxisGrid = d3.axisLeft(scY).tickSize(-pxY-280).tickFormat('').ticks(10);
        svg.append('g')
            .attr('class','y, axis-grid')
            .call(yAxisGrid)
    }).catch(err=>console.log(err))

}
