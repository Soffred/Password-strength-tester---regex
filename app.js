const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
const reasonsContainer = document.getElementById('reasons')

passwordInput.addEventListener('input', () => {
    const weaknesses = calculatePasswordStrength
    (passwordInput.value)

    
    let strength = 100
    reasonsContainer.innerHTML = ''
    weaknesses.forEach(weakness => {
        if(weakness == null) return 
        strength -= weakness.deduction
        const messageElement = document.createElement('div')
        messageElement.innerHTML = weakness.message
        reasonsContainer.appendChild(messageElement)

    })
    strengthMeter.style.setProperty('--strength', strength)
})

function calculatePasswordStrength(password){
    const weaknesses = []
    weaknesses.push(lengthWeaknesses(password))
    weaknesses.push(lowercaseWeaknesses(password))
    weaknesses.push(uppercaseWeaknesses(password))
    weaknesses.push(numberWeaknesses(password))
    weaknesses.push(specialCharactersWeaknesses(password))
    weaknesses.push(repeatCharactersWeakness(password))
    return weaknesses
}

function lengthWeaknesses(password){
    const length = password.length
    if(length <= 5) {
        return {
            message: 'Your password is too short',
            deduction: 40
        }
    }

    if(length <= 10){
        return{
            message: 'Your password could be longer', 
            deduction: 15
        }
    }

}

function lowercaseWeaknesses(password){
    return characterTypeWeaknesses(password, /[a-z]/g, 'lowercase characters' )
}

function uppercaseWeaknesses(password){
    return characterTypeWeaknesses(password, /[A-Z]/g, 'uppercase characters' )
}

function numberWeaknesses(password){
    return characterTypeWeaknesses(password, /[1-9]/g, 'numbers' )
}

function specialCharactersWeaknesses(password){
    return characterTypeWeaknesses(password, /[^0-9a-zA-Z\s]/g, 'special characters' )
}

function characterTypeWeaknesses(password, regex, type){
    const matches = password.match(regex) || []

    if(matches.length === 0){
        return {
            message: `Your password has no ${type}`, 
            deduction: 20
        }

    }

    if(matches.length <= 2){
        return {
            message: `Your password could use more ${type}`, 
            deduction: 5
        }
        
    }

}

function repeatCharactersWeakness(password){
const matches = password.match(/(.)\1/g) || []
if(matches.length > 0 ){
    return{
        message: 'Your password has repeat characters', 
        deduction: matches.length * 10
    }
}
} 



