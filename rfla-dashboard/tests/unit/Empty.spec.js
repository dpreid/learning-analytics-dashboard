import { describe, expect, test } from 'vitest'

describe('Test test', () => {

    test('True test passes', () => {
        
        expect(1 == 1).toBeTruthy();
    
    })

    test('False test passes', () => {
        
        expect(1 == 0).toBeFalsy();
    
    })

})


    

