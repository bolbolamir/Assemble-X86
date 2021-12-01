function assemble(operation, firsdtOperand, secondOperand) {
    let final = ""; //result
    firsdtOperand = firsdtOperand.toLowerCase();
    operation = operation.toLowerCase();
    let numberOfBytes = getNumberOfBytes(firsdtOperand);
    if (numberOfBytes == 16) {
        final = final + "\\x66";
    }

    switch (operation) {
        case "add":
            switch (numberOfBytes) {
                case 8:
                    final = final + "\\x00";
                    break;
                default:
                    final = final + "\\x01";
                    break;
            }
            break;
        case "sub":
            switch (numberOfBytes) {
                case 8:
                    final = final + "\\x28";
                    break;
                default:
                    final = final + "\\x29";
                    break;
            }
            break;
        case "and":
            switch (numberOfBytes) {
                case 8:
                    final = final + "\\x20";
                    break;
                default:
                    final = final + "\\x21";
                    break;
            }
            break;
        case "or":
            switch (numberOfBytes) {
                case 8:
                    final = final + "\\x08";
                    break;
                default:
                    final = final + "\\x09";
                    break;
            }
            break;
    }

    let s2 = getByteAmount(firsdtOperand);
    let s1 = getByteAmount(secondOperand);
    let s3 = `11${s1}${s2}`;
    s3 = parseInt(s3, 2);
    s3 = s3.toString(16);
    final = final + "\\x" + s3;
    return final;
}
function getNumberOfBytes(register) {
    let arr = register.split("");
    for (const i of arr) {
        if (i == "h") {
            return 8;
        } else if (i == "l") {
            return 8;
        } else if (i == "e") {
            return 32;
        }
    }
    return 16;
}

//get three digits
function getByteAmount(e) {
    if (e == "bh" || e.includes("di")) {
        return "111";
    } else if (e == "dh" || e.includes("si")) {
        return "110";
    } else if (e == "ch" || e.includes("bp")) {
        return "101";
    } else if (e == "ah" || e.includes("sp")) {
        return "100";
    } else if (e == "bl" || e.includes("bx")) {
        return "011";
    } else if (e == "dl" || e.includes("dx")) {
        return "010";
    } else if (e == "cl" || e.includes("cx")) {
        return "001";
    } else if (e == "al" || e.includes("ax")) {
        return "000";
    }
}

function deploy() {
    var e1 = document.getElementById("f_op");
    var f_op = e1.value;
    var e2 = document.getElementById("s_op");
    var s_op = e2.value;
    var e3 = document.getElementById("op");
    var op = e3.value;
    var e4 = document.getElementById("result");
    console.log(f_op, s_op, op);

    let firsdtOperand = f_op;
    let secondOperand = s_op;
    let operation = op;
    let r = assemble(op, f_op, s_op);
    e4.innerText = r;
    e4.value = r;
}
