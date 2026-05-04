// Temporary script to add ?? 'Error' to all ErrorMessage components
const fs = require('fs');
const path = require('path');

const files = [
  'libs/features/auth/src/lib/components/ChangePasswordForm.tsx',
  'libs/features/auth/src/lib/components/LoginForm.tsx',
  'libs/features/auth/src/lib/components/RegisterForm.tsx',
  'libs/features/auth/src/lib/components/ProfileForm.tsx',
  'libs/features/auth/src/lib/components/ResetPasswordForm.tsx',
];

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace ErrorMessage message={errors.X.message} with message={errors.X.message ?? ''}
  content = content.replace(
    /message=\{errors\.(\w+)\.message\}/g,
    "message={errors.$1.message ?? ''}"
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log('Done!');
