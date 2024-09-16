/**
 * CustomError.ts
 * CustomError class to extend the built-in Error class
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

class CustomError extends Error{
      public status: number;

      constructor(message: string, status: number){
          super(message);
          this.name = 'CustomError';
          this.status = status;
      };
};

export default CustomError;