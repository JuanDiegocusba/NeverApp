import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Lang = 'es' | 'en';

interface Translations {
  [key: string]: string;
}

const ES: Translations = {
  'app.name': 'NeverApp',
  'menu.dashboard': 'Dashboard',
  'menu.inventory': 'Lista de alimentos',
  'menu.shopping': 'Lista de compras',
  'menu.categories': 'Categorías',
  'menu.alerts': 'Alertas',
  'menu.settings': 'Configuración',
  'menu.logout': 'Cerrar sesión',
  'login.welcome': 'Bienvenido',
  'login.subtitle': 'Inicia sesión para gestionar tus alimentos.',
  'login.email': 'Correo electrónico',
  'login.password': 'Contraseña',
  'login.login': 'Iniciar Sesión',
  'login.register': 'Registrarse',
  'login.noUser': 'No existe ningún usuario registrado',
  'login.success': 'Inicio de sesión correcto',
  'login.error': 'Correo o contraseña incorrectos',
  'register.title': 'Registro',
  'register.createAccount': 'Crear Cuenta',
  'register.subtitle': 'Registra tus datos para comenzar a utilizar NeverApp.',
  'register.fullName': 'Nombre completo',
  'register.email': 'Correo electrónico',
  'register.password': 'Contraseña',
  'register.confirmPassword': 'Confirmar contraseña',
  'register.register': 'Registrarse',
  'register.required': 'Todos los campos son obligatorios',
  'register.passwordMismatch': 'Las contraseñas no coinciden',
  'register.success': 'Usuario registrado correctamente',
  'dashboard.expired': 'Productos vencidos',
  'dashboard.expiring': 'Próximos a vencer',
  'dashboard.lowStock': 'Pocas unidades',
  'dashboard.total': 'Total almacenados',
  'dashboard.products': 'productos',
  'inventory.title': 'Inventario',
  'inventory.search': 'Buscar alimento...',
  'inventory.dairy': 'Lácteos',
  'inventory.fruits': 'Frutas',
  'inventory.meat': 'Carnes y Proteínas',
  'inventory.vegetables': 'Verduras',
  'inventory.grains': 'Granos',
  'inventory.uncategorized': 'Sin categoría',
  'inventory.quantity': 'Cantidad: {{value}} unidades',
  'inventory.expires': 'Vence: {{value}}',
  'inventory.review': 'Revisar Fecha',
  'inventory.empty': 'No hay alimentos en la nevera.',
  'inventory.newTitle': 'Nuevo Alimento',
  'inventory.editTitle': 'Editar Alimento',
  'inventory.close': 'Cerrar',
  'inventory.name': 'Nombre',
  'inventory.amount': 'Cantidad',
  'inventory.expiryDate': 'Fecha Vencimiento',
  'inventory.category': 'Categoría',
  'inventory.save': 'Guardar en Nevera',
  'inventory.update': 'Actualizar Alimento',
  'inventory.fillFields': 'Por favor, llena todos los campos',
  'inventory.units': 'unid.',
  'categories.title': 'Categorías',
  'categories.cardTitle': 'Categorías de alimentos',
  'categories.cardText': 'Organiza los productos del inventario por categorías.',
  'categories.newTitle': 'Nueva Categoría',
  'categories.close': 'Cerrar',
  'categories.namePlaceholder': 'Ej. Lácteos',
  'categories.nameLabel': 'Nombre Categoría',
  'categories.save': 'Guardar Categoría',
  'shopping.title': 'Lista de Compras',
  'shopping.placeholder': 'Añadir artículo (ej. Servilletas)',
  'shopping.empty': '¡Todo al día! No tienes pendientes por comprar.',
  'shopping.finish': 'Finalizar Compra',
  'alerts.title': 'Alertas de Vencimiento',
  'alerts.expired': '¡VENCIDO EL:',
  'alerts.expires': 'Vence:',
  'alerts.units': 'unid.',
  'settings.title': 'Configuración',
  'settings.notifications': 'Notificaciones',
  'settings.changeUsername': 'Cambiar nombre de usuario',
  'settings.usernamePlaceholder': 'Editar',
  'settings.updateUsername': 'Actualizar Nombre',
  'settings.usernameUpdated': 'Nombre actualizado correctamente',
  'settings.language': 'Cambiar idioma',
  'settings.select': 'Seleccionar',
  'settings.deleteData': 'Eliminar datos almacenados',
  'settings.deleteConfirm': '¿Estás seguro de eliminar todos los datos? Esta acción no se puede deshacer.',
  'settings.deleteSuccess': 'Datos eliminados correctamente',
  'settings.cancel': 'Cancelar',
  'settings.confirm': 'Eliminar',
};

const EN: Translations = {
  'app.name': 'NeverApp',
  'menu.dashboard': 'Dashboard',
  'menu.inventory': 'Food List',
  'menu.shopping': 'Shopping List',
  'menu.categories': 'Categories',
  'menu.alerts': 'Alerts',
  'menu.settings': 'Settings',
  'menu.logout': 'Log out',
  'login.welcome': 'Welcome',
  'login.subtitle': 'Log in to manage your food.',
  'login.email': 'Email',
  'login.password': 'Password',
  'login.login': 'Log In',
  'login.register': 'Sign Up',
  'login.noUser': 'No registered user found',
  'login.success': 'Login successful',
  'login.error': 'Incorrect email or password',
  'register.title': 'Register',
  'register.createAccount': 'Create Account',
  'register.subtitle': 'Register your details to start using NeverApp.',
  'register.fullName': 'Full name',
  'register.email': 'Email',
  'register.password': 'Password',
  'register.confirmPassword': 'Confirm password',
  'register.register': 'Sign Up',
  'register.required': 'All fields are required',
  'register.passwordMismatch': 'Passwords do not match',
  'register.success': 'User registered successfully',
  'dashboard.expired': 'Expired products',
  'dashboard.expiring': 'Expiring soon',
  'dashboard.lowStock': 'Low stock',
  'dashboard.total': 'Total stored',
  'dashboard.products': 'products',
  'inventory.title': 'Inventory',
  'inventory.search': 'Search food...',
  'inventory.dairy': 'Dairy',
  'inventory.fruits': 'Fruits',
  'inventory.meat': 'Meat & Proteins',
  'inventory.vegetables': 'Vegetables',
  'inventory.grains': 'Grains',
  'inventory.uncategorized': 'Uncategorized',
  'inventory.quantity': 'Quantity: {{value}} units',
  'inventory.expires': 'Expires: {{value}}',
  'inventory.review': 'Review Date',
  'inventory.empty': 'No food in the fridge.',
  'inventory.newTitle': 'New Food',
  'inventory.editTitle': 'Edit Food',
  'inventory.close': 'Close',
  'inventory.name': 'Name',
  'inventory.amount': 'Amount',
  'inventory.expiryDate': 'Expiry Date',
  'inventory.category': 'Category',
  'inventory.save': 'Save to Fridge',
  'inventory.update': 'Update Food',
  'inventory.fillFields': 'Please fill all fields',
  'inventory.units': 'units',
  'categories.title': 'Categories',
  'categories.cardTitle': 'Food Categories',
  'categories.cardText': 'Organize inventory products by categories.',
  'categories.newTitle': 'New Category',
  'categories.close': 'Close',
  'categories.namePlaceholder': 'e.g. Dairy',
  'categories.nameLabel': 'Category Name',
  'categories.save': 'Save Category',
  'shopping.title': 'Shopping List',
  'shopping.placeholder': 'Add item (e.g. Napkins)',
  'shopping.empty': 'All caught up! Nothing pending to buy.',
  'shopping.finish': 'Finish Purchase',
  'alerts.title': 'Expiry Alerts',
  'alerts.expired': 'EXPIRED ON:',
  'alerts.expires': 'Expires:',
  'alerts.units': 'units',
  'settings.title': 'Settings',
  'settings.notifications': 'Notifications',
  'settings.changeUsername': 'Change username',
  'settings.usernamePlaceholder': 'Edit',
  'settings.updateUsername': 'Update Name',
  'settings.usernameUpdated': 'Name updated successfully',
  'settings.language': 'Change language',
  'settings.select': 'Select',
  'settings.deleteData': 'Delete stored data',
  'settings.deleteConfirm': 'Are you sure you want to delete all data? This action cannot be undone.',
  'settings.deleteSuccess': 'Data deleted successfully',
  'settings.cancel': 'Cancel',
  'settings.confirm': 'Delete',
};

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private currentLang: Lang = 'es';
  private translations: Record<Lang, Translations> = { es: ES, en: EN };
  public langChanged = new BehaviorSubject<Lang>('es');

  constructor() {
    const stored = localStorage.getItem('neverapp_lang') as Lang | null;
    if (stored === 'es' || stored === 'en') {
      this.currentLang = stored;
    }
    this.langChanged.next(this.currentLang);
  }

  get lang(): Lang {
    return this.currentLang;
  }

  setLang(lang: Lang) {
    this.currentLang = lang;
    localStorage.setItem('neverapp_lang', lang);
    this.langChanged.next(lang);
  }

  t(key: string, params?: Record<string, string | number | null>): string {
    const dict = this.translations[this.currentLang];
    let value = dict[key] || key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(`{{${k}}}`, v != null ? String(v) : '');
      }
    }
    return value;
  }
}
