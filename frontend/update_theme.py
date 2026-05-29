import os

files_to_update = [
    r'c:\Users\Asus\startup\novoplast-store\frontend\src\pages\HomePage.jsx',
    r'c:\Users\Asus\startup\novoplast-store\frontend\src\components\Navbar.jsx',
    r'c:\Users\Asus\startup\novoplast-store\frontend\src\components\Footer.jsx',
    r'c:\Users\Asus\startup\novoplast-store\frontend\src\pages\ProductPage.jsx',
    r'c:\Users\Asus\startup\novoplast-store\frontend\src\pages\CheckoutPage.jsx',
    r'c:\Users\Asus\startup\novoplast-store\frontend\src\pages\OrdersPage.jsx'
]

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace saffron with novo
    content = content.replace('saffron', 'novo')
    # Replace gold with novo
    content = content.replace('gold', 'novo')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Replacement script complete")
