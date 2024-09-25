import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellProductComponent } from './sell.component';

describe('SellComponent', () => {
  let component: SellProductComponent;
  let fixture: ComponentFixture<SellProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});