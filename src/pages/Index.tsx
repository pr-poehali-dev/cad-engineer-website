import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [serviceType, setServiceType] = useState('');
  const [area, setArea] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const services = [
    { value: 'land-plot', label: 'Межевание земельного участка', basePrice: 15000, pricePerUnit: 300 },
    { value: 'tech-plan', label: 'Технический план здания', basePrice: 20000, pricePerUnit: 500 },
    { value: 'document', label: 'Акт обследования', basePrice: 12000, pricePerUnit: 200 },
    { value: 'consultation', label: 'Консультация', basePrice: 5000, pricePerUnit: 0 },
  ];

  const calculatePrice = () => {
    const service = services.find(s => s.value === serviceType);
    if (service && area) {
      const total = service.basePrice + (service.pricePerUnit * parseFloat(area));
      setCalculatedPrice(total);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={28} className="text-primary" />
            <span className="text-xl font-bold text-primary">Кадастровые услуги</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection('calculator')} className="text-sm font-medium hover:text-primary transition-colors">
              Калькулятор
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              О компании
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl font-bold text-foreground leading-tight">
                Профессиональные кадастровые услуги
              </h1>
              <p className="text-xl text-muted-foreground">
                Точность, надёжность и соблюдение всех законодательных норм
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button onClick={() => scrollToSection('calculator')} size="lg" className="font-semibold">
                  Рассчитать стоимость
                </Button>
                <Button onClick={() => scrollToSection('contacts')} size="lg" variant="outline" className="font-semibold">
                  Связаться с нами
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
              <p className="text-muted-foreground text-lg">Полный спектр кадастровых работ</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Межевание земельных участков</CardTitle>
                  <CardDescription>
                    Установление и закрепление границ земельного участка на местности
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="FileText" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Технические планы</CardTitle>
                  <CardDescription>
                    Подготовка технических планов зданий и сооружений для регистрации прав
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="BarChart3" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Акты обследования</CardTitle>
                  <CardDescription>
                    Составление актов обследования объектов недвижимости
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Вынос границ в натуру</CardTitle>
                  <CardDescription>
                    Определение и обозначение границ участка на местности
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Search" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Топографическая съёмка</CardTitle>
                  <CardDescription>
                    Создание топографических планов местности для проектирования
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="MessageCircle" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Консультации</CardTitle>
                  <CardDescription>
                    Профессиональные консультации по кадастровым вопросам
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="calculator" className="py-20 bg-secondary/20">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">Калькулятор стоимости услуг</CardTitle>
                  <CardDescription>
                    Рассчитайте приблизительную стоимость кадастровых работ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="service">Выберите тип услуги</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Площадь объекта (м²)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Введите площадь"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>

                  <Button onClick={calculatePrice} className="w-full font-semibold" size="lg">
                    Рассчитать стоимость
                  </Button>

                  {calculatedPrice !== null && (
                    <div className="mt-6 p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Приблизительная стоимость</p>
                        <p className="text-4xl font-bold text-primary">
                          {calculatedPrice.toLocaleString('ru-RU')} ₽
                        </p>
                        <p className="text-xs text-muted-foreground mt-4">
                          Окончательная стоимость определяется после осмотра объекта
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center">О компании</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Мы являемся аккредитованными кадастровыми инженерами с многолетним опытом работы.
                  Наша команда специализируется на предоставлении полного спектра кадастровых услуг
                  для физических и юридических лиц.
                </p>
                <p>
                  Мы гарантируем высокое качество выполнения работ, соблюдение всех законодательных
                  требований и индивидуальный подход к каждому клиенту.
                </p>
              </div>
              
              <Separator className="my-10" />
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-muted-foreground">лет опыта</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">выполненных проектов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">довольных клиентов</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-secondary/20">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center">Контакты</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Телефон</div>
                        <a href="tel:+79118449565" className="text-muted-foreground hover:text-primary">
                          +7 (911) 844-95-65
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Email</div>
                        <a href="mailto:conti100@gmail.com" className="text-muted-foreground hover:text-primary">
                          conti100@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Адрес</div>
                        <p className="text-muted-foreground">
                          г. Москва, ул. Примерная, д. 1, офис 101
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Режим работы</div>
                        <p className="text-muted-foreground">
                          Пн-Пт: 9:00 - 18:00<br />
                          Сб-Вс: выходной
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-white">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Кадастровые услуги. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;