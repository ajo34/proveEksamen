document.getElementById('getAllBtn').addEventListener('click', async () => {
    try {
        console.log('getting')
        const response = await fetch('/fetchallusers/')
        console.log('res',  response)
        const users = await response.json()
        
         displayUsers(await users)
        
    } catch (err) {
        console.error('err', err)
    }
})

function displayUsers(users) {
    document.getElementById('usersContainer').innerHTML = `
            <table>
                <tr>
                    <th>Name</th><th>Computer</th>
                </tr>
            </table>`
    users.forEach(user => {
        //<tr ondblclick="contextMenu(this.id)" id="${idVar}">
        document.getElementById('usersContainer').innerHTML +=
        `
        <td>${user.name}</td>
        <td>${user.computer}</td>
        </tr>`;
        //idVar++;
    })
    const nodeList = document.querySelectorAll("td");
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].addEventListener('click', () => {
            console.log('td')
        })
    }
}