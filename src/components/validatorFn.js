
export function validatorFn(...input) {
	if(input[0] === '' || input[1] === '' || input[2] === '' || input[3] === '' || input[4] === '') {
		return 'Vui lòng nhập trường này'
	}
}