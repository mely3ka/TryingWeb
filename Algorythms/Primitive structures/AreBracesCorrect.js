function iscorrect (braces){
    var stack = [];
    var opened = ['{','[','('];
    for (var i=0;i<braces.length;++i){
        if(stack.length == 0 || opened.indexOf(stack[stack.length-1])!=-1){
            if (opened.indexOf(braces[i])!=-1){
                stack.push(braces[i]);
                continue;
            }

            switch (braces[i]){
                case '}':
                    if(stack[stack.length-1]!='{'){
                        return i+1;
                    }
                    else{
                        stack.pop();
                    }
                    break;

                case ')':
                    if(stack[stack.length-1]!='('){
                        return i+1;
                    }
                    else{
                        stack.pop();
                    }
                    break;

                case ']':
                    if(stack[stack.length-1]!='['){
                        return i+1;
                    }
                    else{
                        stack.pop();
                    }
                    break;
            }

        }
        else{
            return i;
        }
    }
    if(stack.length==0){
    return 'Success';
    }
    else return stack.length;
}
console.log(iscorrect('{*{{}'));

